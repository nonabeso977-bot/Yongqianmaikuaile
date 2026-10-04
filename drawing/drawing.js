// ========================================
// 🌟用钱买快乐🌟
// drawing.js
// محرك الرسم الرئيسي
// ========================================


let canvas = null;

let ctx = null;

let isDrawing = false;


// ========================================
// تشغيل محرر الرسم
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        canvas =
            document.getElementById(
                "drawingCanvas"
            );

        if (!canvas) {
            return;
        }

        ctx =
            canvas.getContext("2d");

        setupCanvas();

        setupDrawingEvents();

        setupToolEvents();

        setupPageEvents();

        setupSaveEvents();

        initializeDrawingPages();

        updatePageIndicator();

        updateActiveTool();

    }
);


// ========================================
// إعداد Canvas
// ========================================

function setupCanvas() {

    resizeCanvas();

}


// ========================================
// تغيير حجم Canvas
// ========================================

function resizeCanvas() {

    if (!canvas) {
        return;
    }

    const oldWidth =
        canvas.width;

    const oldHeight =
        canvas.height;

    const newWidth =
        canvas.clientWidth;

    const newHeight =
        canvas.clientHeight;


    if (
        oldWidth === newWidth &&
        oldHeight === newHeight
    ) {
        return;
    }


    let oldImage = null;


    if (
        oldWidth > 0 &&
        oldHeight > 0
    ) {

        oldImage =
            canvas.toDataURL(
                "image/png"
            );

    }


    canvas.width =
        newWidth;

    canvas.height =
        newHeight;


    if (!oldImage) {
        return;
    }


    const image =
        new Image();


    image.onload = () => {

        ctx.drawImage(
            image,
            0,
            0,
            newWidth,
            newHeight
        );

    };


    image.src =
        oldImage;

}


// ========================================
// مراقبة تغيير حجم الشاشة
// ========================================

window.addEventListener(
    "resize",
    () => {

        saveCurrentDrawingPage(
            canvas
        );

        resizeCanvas();

    }
);


// ========================================
// أحداث الرسم
// ========================================

function setupDrawingEvents() {

    setupMouseEvents();

    setupTouchEvents();

}


// ========================================
// الماوس
// ========================================

function setupMouseEvents() {

    canvas.addEventListener(
        "mousedown",
        (event) => {

            const position =
                getPointerPosition(event);

            handlePointerDown(
                position.x,
                position.y
            );

        }
    );


    canvas.addEventListener(
        "mousemove",
        (event) => {

            const position =
                getPointerPosition(event);

            draw(
                position.x,
                position.y
            );

        }
    );


    canvas.addEventListener(
        "mouseup",
        stopDrawing
    );


    canvas.addEventListener(
        "mouseleave",
        stopDrawing
    );

}


// ========================================
// اللمس
// ========================================

function setupTouchEvents() {

    canvas.addEventListener(
        "touchstart",
        (event) => {

            event.preventDefault();

            const touch =
                event.touches[0];

            const position =
                getPointerPosition(touch);

            handlePointerDown(
                position.x,
                position.y
            );

        },
        {
            passive: false
        }
    );


    canvas.addEventListener(
        "touchmove",
        (event) => {

            event.preventDefault();

            const touch =
                event.touches[0];

            const position =
                getPointerPosition(touch);

            draw(
                position.x,
                position.y
            );

        },
        {
            passive: false
        }
    );


    canvas.addEventListener(
        "touchend",
        (event) => {

            event.preventDefault();

            stopDrawing();

        },
        {
            passive: false
        }
    );

}


// ========================================
// التعامل مع الضغط على اللوحة
// ========================================

function handlePointerDown(x, y) {

    const tool =
        getDrawingTool();


    // 💧 القطارة

    if (tool === "eyedropper") {

        pickColorFromCanvas(
            x,
            y
        );

        return;

    }


    // 🪣 دلو التعبئة

    if (tool === "fill") {

        fillArea(
            x,
            y
        );

        return;

    }


    // ✏️ القلم / 🧽 الممحاة

    startDrawing(
        x,
        y
    );

}


// ========================================
// موقع المؤشر داخل Canvas
// ========================================

function getPointerPosition(event) {

    const rect =
        canvas.getBoundingClientRect();


    const scaleX =
        canvas.width /
        rect.width;

    const scaleY =
        canvas.height /
        rect.height;


    return {

        x:
            (event.clientX -
            rect.left) *
            scaleX,

        y:
            (event.clientY -
            rect.top) *
            scaleY

    };

}


// ========================================
// بدء الرسم
// ========================================

function startDrawing(x, y) {

    isDrawing = true;

    ctx.beginPath();

    ctx.moveTo(
        x,
        y
    );

}


// ========================================
// الرسم
// ========================================

function draw(x, y) {

    if (!isDrawing) {
        return;
    }


    const tool =
        getDrawingTool();


    // لا نرسم أثناء القطارة أو الدلو

    if (
        tool === "eyedropper" ||
        tool === "fill"
    ) {
        return;
    }


    ctx.lineWidth =
        getBrushSize();

    ctx.lineCap =
        "round";

    ctx.lineJoin =
        "round";


    if (
        tool === "eraser"
    ) {

        ctx.globalCompositeOperation =
            "destination-out";

    } else {

        ctx.globalCompositeOperation =
            "source-over";

        ctx.strokeStyle =
            getDrawingColor();

    }


    ctx.lineTo(
        x,
        y
    );

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(
        x,
        y
    );

}


// ========================================
// إيقاف الرسم
// ========================================

function stopDrawing() {

    if (!isDrawing) {
        return;
    }

    isDrawing = false;

    ctx.beginPath();

    ctx.globalCompositeOperation =
        "source-over";


    saveCurrentDrawingPage(
        canvas
    );

}


// ========================================
// القطارة
// ========================================

function pickColorFromCanvas(x, y) {

    const pixel =
        ctx.getImageData(
            Math.floor(x),
            Math.floor(y),
            1,
            1
        ).data;


    const red =
        pixel[0]
            .toString(16)
            .padStart(2, "0");

    const green =
        pixel[1]
            .toString(16)
            .padStart(2, "0");

    const blue =
        pixel[2]
            .toString(16)
            .padStart(2, "0");


    const color =
        "#" +
        red +
        green +
        blue;


    setDrawingColor(
        color
    );


    const colorPicker =
        document.getElementById(
            "colorPicker"
        );


    if (colorPicker) {

        colorPicker.value =
            color;

    }


    setDrawingTool(
        "pen"
    );


    updateActiveTool();

}


// ========================================
// دلو التعبئة
// ========================================

function fillArea(x, y) {

    const startX =
        Math.floor(x);

    const startY =
        Math.floor(y);


    if (
        startX < 0 ||
        startY < 0 ||
        startX >= canvas.width ||
        startY >= canvas.height
    ) {
        return;
    }


    const imageData =
        ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );


    const pixels =
        imageData.data;


    const width =
        canvas.width;

    const height =
        canvas.height;


    const startIndex =
        (
            startY *
            width +
            startX
        ) * 4;


    const targetR =
        pixels[startIndex];

    const targetG =
        pixels[startIndex + 1];

    const targetB =
        pixels[startIndex + 2];

    const targetA =
        pixels[startIndex + 3];


    const newColor =
        hexToRgb(
            getDrawingColor()
        );


    if (!newColor) {
        return;
    }


    if (
        targetR === newColor.r &&
        targetG === newColor.g &&
        targetB === newColor.b &&
        targetA === 255
    ) {
        return;
    }


    const matchesTarget =
        (index) => {

            return (

                pixels[index] === targetR &&

                pixels[index + 1] === targetG &&

                pixels[index + 2] === targetB &&

                pixels[index + 3] === targetA

            );

        };


    const paint =
        (index) => {

            pixels[index] =
                newColor.r;

            pixels[index + 1] =
                newColor.g;

            pixels[index + 2] =
                newColor.b;

            pixels[index + 3] =
                255;

        };


    const queue = [];

    let queueIndex = 0;


    queue.push([
        startX,
        startY
    ]);


    while (
        queueIndex <
        queue.length
    ) {

        const point =
            queue[queueIndex++];

        const px =
            point[0];

        const py =
            point[1];


        if (
            px < 0 ||
            py < 0 ||
            px >= width ||
            py >= height
        ) {
            continue;
        }


        const index =
            (
                py *
                width +
                px
            ) * 4;


        if (
            !matchesTarget(index)
        ) {
            continue;
        }


        paint(index);


        queue.push(
            [px + 1, py],
            [px - 1, py],
            [px, py + 1],
            [px, py - 1]
        );

    }


    ctx.putImageData(
        imageData,
        0,
        0
    );


    saveCurrentDrawingPage(
        canvas
    );

}


// ========================================
// تحويل HEX إلى RGB
// ========================================

function hexToRgb(hex) {

    if (
        typeof hex !== "string"
    ) {
        return null;
    }


    const match =
        /^#([0-9a-f]{6})$/i
            .exec(hex);


    if (!match) {
        return null;
    }


    return {

        r:
            parseInt(
                match[1].slice(0, 2),
                16
            ),

        g:
            parseInt(
                match[1].slice(2, 4),
                16
            ),

        b:
            parseInt(
                match[1].slice(4, 6),
                16
            )

    };

}


// ========================================
// أدوات الرسم
// ========================================

function setupToolEvents() {

    const pen =
        document.getElementById(
            "penTool"
        );

    const eraser =
        document.getElementById(
            "eraserTool"
        );

    const eyedropper =
        document.getElementById(
            "eyedropperTool"
        );

    const fill =
        document.getElementById(
            "fillTool"
        );

    const color =
        document.getElementById(
            "colorPicker"
        );

    const size =
        document.getElementById(
            "brushSize"
        );

    const clear =
        document.getElementById(
            "clearCanvas"
        );


    pen.addEventListener(
        "click",
        () => {

            setDrawingTool(
                "pen"
            );

            updateActiveTool();

        }
    );


    eraser.addEventListener(
        "click",
        () => {

            setDrawingTool(
                "eraser"
            );

            updateActiveTool();

        }
    );


    eyedropper.addEventListener(
        "click",
        () => {

            setDrawingTool(
                "eyedropper"
            );

            updateActiveTool();

        }
    );


    fill.addEventListener(
        "click",
        () => {

            setDrawingTool(
                "fill"
            );

            updateActiveTool();

        }
    );


    color.addEventListener(
        "input",
        () => {

            setDrawingColor(
                color.value
            );

            setDrawingTool(
                "pen"
            );

            updateActiveTool();

        }
    );


    size.addEventListener(
        "input",
        () => {

            setBrushSize(
                size.value
            );

        }
    );


    clear.addEventListener(
        "click",
        clearCanvas
    );

}


// ========================================
// الأداة النشطة
// ========================================

function updateActiveTool() {

    const buttons = [

        "penTool",

        "eraserTool",

        "eyedropperTool",

        "fillTool"

    ];


    buttons.forEach(
        (id) => {

            const button =
                document.getElementById(
                    id
                );

            if (button) {

                button.classList.remove(
                    "active"
                );

            }

        }
    );


    const currentTool =
        getDrawingTool();


    const activeButton =
        document.getElementById(

            currentTool === "pen"
                ? "penTool"

            : currentTool === "eraser"
                ? "eraserTool"

            : currentTool === "eyedropper"
                ? "eyedropperTool"

            : currentTool === "fill"
                ? "fillTool"

            : null

        );


    if (activeButton) {

        activeButton.classList.add(
            "active"
        );

    }

}


// ========================================
// مسح Canvas
// ========================================

function clearCanvas() {

    const confirmed =
        confirm(
            "هل تريدين مسح هذه الصفحة؟"
        );

    if (!confirmed) {
        return;
    }


    clearCanvasWithoutConfirm();


    saveCurrentDrawingPage(
        canvas
    );

}


// ========================================
// مسح بدون تأكيد
// ========================================

function clearCanvasWithoutConfirm() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


// ========================================
// الصفحات
// ========================================

function setupPageEvents() {

    const newPage =
        document.getElementById(
            "newPage"
        );

    const previous =
        document.getElementById(
            "previousPage"
        );

    const next =
        document.getElementById(
            "nextPage"
        );


    newPage.addEventListener(
        "click",
        () => {

            saveCurrentDrawingPage(
                canvas
            );

            createDrawingPage();

            clearCanvasWithoutConfirm();

        }
    );


    previous.addEventListener(
        "click",
        () => {

            saveCurrentDrawingPage(
                canvas
            );

            if (
                previousDrawingPage()
            ) {

                loadCurrentPage();

            }

        }
    );


    next.addEventListener(
        "click",
        () => {

            saveCurrentDrawingPage(
                canvas
            );

            if (
                nextDrawingPage()
            ) {

                loadCurrentPage();

            }

        }
    );

}


// ========================================
// تحميل الصفحة الحالية
// ========================================

function loadCurrentPage() {

    clearCanvasWithoutConfirm();

    const imageData =
        getDrawingPageImage();


    if (!imageData) {
        return;
    }


    const image =
        new Image();


    image.onload = () => {

        ctx.drawImage(
            image,
            0,
            0,
            canvas.width,
            canvas.height
        );

    };


    image.src =
        imageData;

}


// ========================================
// الحفظ
// ========================================

function setupSaveEvents() {

    const saveButton =
        document.getElementById(
            "saveDrawing"
        );


    saveButton.addEventListener(
        "click",
        () => {

            saveDrawingLocally(
                canvas
            );

            showMessage(
                "تم حفظ الرسمة."
            );

        }
    );

}
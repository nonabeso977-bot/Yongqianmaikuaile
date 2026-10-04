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

            startDrawing(
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

            startDrawing(
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
// موقع المؤشر داخل Canvas
// ========================================

function getPointerPosition(event) {

    const rect =
        canvas.getBoundingClientRect();


    return {

        x:
            event.clientX -
            rect.left,

        y:
            event.clientY -
            rect.top

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


    ctx.lineWidth =
        getBrushSize();

    ctx.lineCap =
        "round";

    ctx.lineJoin =
        "round";


    if (
        getDrawingTool() ===
        "eraser"
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

            setDrawingTool("pen");

            updateActiveTool();

        }
    );


    eraser.addEventListener(
        "click",
        () => {

            setDrawingTool("eraser");

            updateActiveTool();

        }
    );


    color.addEventListener(
        "input",
        () => {

            setDrawingColor(
                color.value
            );

            setDrawingTool("pen");

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

    const pen =
        document.getElementById(
            "penTool"
        );

    const eraser =
        document.getElementById(
            "eraserTool"
        );


    pen.classList.remove(
        "active"
    );

    eraser.classList.remove(
        "active"
    );


    if (
        getDrawingTool() ===
        "pen"
    ) {

        pen.classList.add(
            "active"
        );

    }


    if (
        getDrawingTool() ===
        "eraser"
    ) {

        eraser.classList.add(
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

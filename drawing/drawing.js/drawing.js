// ========================================
// 🌟用钱买快乐🌟
// drawing.js
// محرك الرسم الرئيسي
// ========================================


let canvas;

let ctx;

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

        setupDrawingTools();

        setupPageControls();

        setupSaveControls();

        initializeDrawingCanvas();

    }
);


// ========================================
// إعداد حجم Canvas
// ========================================

function setupCanvas() {

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );

}


// ========================================
// تغيير حجم Canvas
// ========================================

function resizeCanvas() {

    if (!canvas) {
        return;
    }

    const oldImage =
        canvas.width > 0 &&
        canvas.height > 0
            ? canvas.toDataURL("image/png")
            : null;

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    canvas.width = width;

    canvas.height = height;

    if (oldImage) {

        const image =
            new Image();

        image.onload = () => {

            ctx.drawImage(
                image,
                0,
                0
            );

        };

        image.src = oldImage;

    }

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

    saveCurrentDrawingPage(canvas);

}


// ========================================
// تحويل موقع الماوس/اللمس
// ========================================

function getCanvasPosition(event) {

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
// أحداث الماوس
// ========================================

function setupMouseDrawing() {

    canvas.addEventListener(
        "mousedown",
        (event) => {

            const position =
                getCanvasPosition(event);

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
                getCanvasPosition(event);

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
// أحداث اللمس
// ========================================

function setupTouchDrawing() {

    canvas.addEventListener(
        "touchstart",
        (event) => {

            event.preventDefault();

            const touch =
                event.touches[0];

            const position =
                getCanvasPosition(touch);

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
                getCanvasPosition(touch);

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
// أدوات الرسم
// ========================================

function setupDrawingTools() {

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
        () => {

            clearCanvas();

        }
    );

}


// ========================================
// تحديث الأداة النشطة
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
// مسح اللوحة
// ========================================

function clearCanvas() {

    const confirmed =
        confirm(
            "هل تريدين مسح هذه الصفحة؟"
        );

    if (!confirmed) {
        return;
    }

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    saveCurrentDrawingPage(
        canvas
    );

}


// ========================================
// التحكم بالصفحات
// ========================================

function setupPageControls() {

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
// مسح بدون رسالة تأكيد
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
// الحفظ
// ========================================

function setupSaveControls() {

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


// ========================================
// تشغيل Canvas
// ========================================

function initializeDrawingCanvas() {

    setupMouseDrawing();

    setupTouchDrawing();

    initializeDrawingPages();

    updatePageIndicator();

    updateActiveTool();

}
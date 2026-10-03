// ========================================
// 🌟用钱买快乐🌟
// drawing-save.js
// نظام حفظ الرسومات
// ========================================


// ========================================
// تحويل Canvas إلى صورة
// ========================================

function canvasToImage(canvas) {

    if (!canvas) {
        return null;
    }

    return canvas.toDataURL(
        "image/png"
    );

}


// ========================================
// حفظ الصفحة الحالية
// ========================================

function saveCurrentDrawingPage(canvas) {

    if (!canvas) {
        return false;
    }

    const image =
        canvasToImage(canvas);

    saveDrawingPage(image);

    return true;

}


// ========================================
// جمع صور جميع الصفحات
// ========================================

function collectDrawingPages() {

    const pages = [];

    const pageCount =
        getDrawingPageCount();

    for (
        let index = 0;
        index < pageCount;
        index++
    ) {

        const image =
            getDrawingPageImage(index);

        if (image) {

            pages.push(image);

        }

    }

    return pages;

}


// ========================================
// حفظ الرسمة محليًا
// ========================================

function saveDrawingLocally(canvas) {

    if (!canvas) {
        return false;
    }

    saveCurrentDrawingPage(canvas);

    const drawing = {

        pages:
            collectDrawingPages(),

        currentPage:
            getCurrentDrawingPage(),

        savedAt:
            new Date().toISOString()

    };

    saveData(
        "currentDrawing",
        drawing
    );

    return true;

}


// ========================================
// تحميل الرسمة المحفوظة
// ========================================

function loadSavedDrawing() {

    return getData(
        "currentDrawing"
    );

}


// ========================================
// حذف الرسمة المحفوظة
// ========================================

function deleteSavedDrawing() {

    deleteData(
        "currentDrawing"
    );

}


// ========================================
// تصدير Canvas كصورة
// ========================================

function downloadDrawing(canvas) {

    if (!canvas) {
        return false;
    }

    const image =
        canvasToImage(canvas);

    const link =
        document.createElement("a");

    link.href = image;

    link.download =
        "my-drawing.png";

    document.body.appendChild(link);

    link.click();

    link.remove();

    return true;

}
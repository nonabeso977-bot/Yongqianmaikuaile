// ========================================
// 🌟用钱买快乐🌟
// drawing-save.js
// نظام حفظ الرسومات
// ========================================


// ========================================
// تحويل Canvas إلى صورة
// ========================================

function getCanvasImage(canvas) {

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
        getCanvasImage(canvas);

    saveDrawingPage(image);

    return true;

}


// ========================================
// حفظ جميع الصفحات
// ========================================

function getAllDrawingPages() {

    const pages = [];

    const total =
        getDrawingPageCount();

    for (
        let index = 0;
        index < total;
        index++
    ) {

        pages.push(
            getDrawingPageImage(index)
        );

    }

    return pages;

}


// ========================================
// حفظ الرسمة كاملة في التخزين المحلي
// ========================================

function saveDrawingLocally(canvas) {

    if (!canvas) {
        return false;
    }

    saveCurrentDrawingPage(canvas);

    const pages =
        getAllDrawingPages();

    saveData(
        "currentDrawing",
        {
            pages: pages,
            currentPage:
                getCurrentDrawingPage(),
            date:
                new Date().toISOString()
        }
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
// تصدير الرسمة كصورة
// ========================================

function downloadDrawing(canvas) {

    if (!canvas) {
        return false;
    }

    const image =
        canvas.toDataURL(
            "image/png"
        );

    const link =
        document.createElement("a");

    link.href = image;

    link.download =
        "my-drawing.png";

    link.click();

    return true;

}

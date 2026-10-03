// ========================================
// 🌟用钱买快乐🌟
// drawing-tools.js
// أدوات الرسم
// ========================================


const drawingTools = {

    currentTool: "pen",

    color: "#222222",

    brushSize: 5,

    pages: [],

    currentPage: 0

};


// ========================================
// اختيار الأداة
// ========================================

function setDrawingTool(tool) {

    const allowedTools = [
        "pen",
        "eraser"
    ];

    if (!allowedTools.includes(tool)) {
        return;
    }

    drawingTools.currentTool = tool;

}


// ========================================
// الحصول على الأداة الحالية
// ========================================

function getDrawingTool() {

    return drawingTools.currentTool;

}


// ========================================
// تغيير اللون
// ========================================

function setDrawingColor(color) {

    if (!color) {
        return;
    }

    drawingTools.color = color;

}


// ========================================
// الحصول على اللون
// ========================================

function getDrawingColor() {

    return drawingTools.color;

}


// ========================================
// تغيير حجم القلم
// ========================================

function setBrushSize(size) {

    const number =
        Number(size);

    if (!Number.isFinite(number)) {
        return;
    }

    drawingTools.brushSize =
        Math.max(
            1,
            Math.min(
                50,
                number
            )
        );

}


// ========================================
// الحصول على حجم القلم
// ========================================

function getBrushSize() {

    return drawingTools.brushSize;

}


// ========================================
// إضافة صفحة جديدة
// ========================================

function addDrawingPage() {

    drawingTools.pages.push({
        image: null
    });

    drawingTools.currentPage =
        drawingTools.pages.length - 1;

    return drawingTools.currentPage;

}


// ========================================
// الحصول على رقم الصفحة الحالية
// ========================================

function getCurrentPage() {

    return drawingTools.currentPage;

}


// ========================================
// الانتقال إلى صفحة
// ========================================

function goToDrawingPage(pageIndex) {

    const index =
        Number(pageIndex);

    if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= drawingTools.pages.length
    ) {
        return false;
    }

    drawingTools.currentPage = index;

    return true;

}


// ========================================
// عدد الصفحات
// ========================================

function getPageCount() {

    return drawingTools.pages.length;

}


// ========================================
// حفظ محتوى الصفحة الحالية
// ========================================

function saveDrawingPage(imageData) {

    if (
        drawingTools.pages.length === 0
    ) {
        addDrawingPage();
    }

    drawingTools.pages[
        drawingTools.currentPage
    ].image = imageData;

}


// ========================================
// الحصول على محتوى الصفحة الحالية
// ========================================

function getCurrentPageData() {

    if (
        drawingTools.pages.length === 0
    ) {
        return null;
    }

    return drawingTools.pages[
        drawingTools.currentPage
    ].image;

}


// ========================================
// حذف جميع الصفحات
// ========================================

function clearDrawingPages() {

    drawingTools.pages = [];

    drawingTools.currentPage = 0;

}


// ========================================
// إعادة ضبط الأدوات
// ========================================

function resetDrawingTools() {

    drawingTools.currentTool = "pen";

    drawingTools.color = "#222222";

    drawingTools.brushSize = 5;

      }

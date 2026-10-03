// ========================================
// 🌟用钱买快乐🌟
// drawing-pages.js
// نظام صفحات الرسم
// ========================================


// ========================================
// بيانات الصفحات
// ========================================

const drawingPages = {

    pages: [],

    currentPage: 0

};


// ========================================
// إنشاء الصفحة الأولى
// ========================================

function initializeDrawingPages() {

    if (drawingPages.pages.length > 0) {
        return;
    }

    drawingPages.pages.push({
        image: null
    });

    drawingPages.currentPage = 0;

}


// ========================================
// إنشاء صفحة جديدة
// ========================================

function createDrawingPage() {

    drawingPages.pages.push({
        image: null
    });

    drawingPages.currentPage =
        drawingPages.pages.length - 1;

    updatePageIndicator();

    return drawingPages.currentPage;

}


// ========================================
// عدد الصفحات
// ========================================

function getDrawingPageCount() {

    return drawingPages.pages.length;

}


// ========================================
// الصفحة الحالية
// ========================================

function getCurrentDrawingPage() {

    return drawingPages.currentPage;

}


// ========================================
// الانتقال إلى صفحة
// ========================================

function switchDrawingPage(pageIndex) {

    const index = Number(pageIndex);

    if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= drawingPages.pages.length
    ) {
        return false;
    }

    drawingPages.currentPage = index;

    updatePageIndicator();

    return true;

}


// ========================================
// الصفحة السابقة
// ========================================

function previousDrawingPage() {

    if (drawingPages.currentPage <= 0) {
        return false;
    }

    drawingPages.currentPage--;

    updatePageIndicator();

    return true;

}


// ========================================
// الصفحة التالية
// ========================================

function nextDrawingPage() {

    if (
        drawingPages.currentPage >=
        drawingPages.pages.length - 1
    ) {
        return false;
    }

    drawingPages.currentPage++;

    updatePageIndicator();

    return true;

}


// ========================================
// حفظ صورة الصفحة
// ========================================

function saveDrawingPage(imageData) {

    if (
        drawingPages.pages.length === 0
    ) {
        initializeDrawingPages();
    }

    drawingPages.pages[
        drawingPages.currentPage
    ].image = imageData;

}


// ========================================
// الحصول على صورة الصفحة
// ========================================

function getDrawingPageImage(pageIndex = drawingPages.currentPage) {

    const index = Number(pageIndex);

    if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= drawingPages.pages.length
    ) {
        return null;
    }

    return drawingPages.pages[index].image;

}


// ========================================
// حذف صفحة
// ========================================

function deleteDrawingPage(pageIndex = drawingPages.currentPage) {

    const index = Number(pageIndex);

    if (
        drawingPages.pages.length <= 1
    ) {
        return false;
    }

    if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= drawingPages.pages.length
    ) {
        return false;
    }

    drawingPages.pages.splice(index, 1);

    if (
        drawingPages.currentPage >=
        drawingPages.pages.length
    ) {
        drawingPages.currentPage =
            drawingPages.pages.length - 1;
    }

    updatePageIndicator();

    return true;

}


// ========================================
// تحديث رقم الصفحة الظاهر
// ========================================

function updatePageIndicator() {

    const indicator =
        document.getElementById(
            "pageIndicator"
        );

    if (!indicator) {
        return;
    }

    indicator.textContent =
        `صفحة ${drawingPages.currentPage + 1}`;

}


// ========================================
// تشغيل نظام الصفحات
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeDrawingPages();

        updatePageIndicator();

    }
);

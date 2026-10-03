// ========================================
// 🌟用钱买快乐🌟
// drawing-tools.js
// نظام أدوات الرسم
// ========================================


// ========================================
// حالة أدوات الرسم
// ========================================

const drawingToolState = {

    currentTool: "pen",

    color: "#222222",

    size: 5

};


// ========================================
// الأدوات المتاحة
// ========================================

const DRAWING_TOOLS = {

    pen: {
        name: "القلم",
        icon: "✏️"
    },

    eraser: {
        name: "الممحاة",
        icon: "🧽"
    }

};


// ========================================
// اختيار الأداة
// ========================================

function setDrawingTool(tool) {

    if (!DRAWING_TOOLS[tool]) {
        return;
    }

    drawingToolState.currentTool = tool;

}


// ========================================
// معرفة الأداة الحالية
// ========================================

function getDrawingTool() {

    return drawingToolState.currentTool;

}


// ========================================
// تغيير لون القلم
// ========================================

function setDrawingColor(color) {

    if (
        typeof color !== "string" ||
        !color
    ) {
        return;
    }

    drawingToolState.color = color;

}


// ========================================
// معرفة اللون الحالي
// ========================================

function getDrawingColor() {

    return drawingToolState.color;

}


// ========================================
// تغيير حجم القلم
// ========================================

function setBrushSize(size) {

    const value = Number(size);

    if (!Number.isFinite(value)) {
        return;
    }

    drawingToolState.size =
        Math.max(
            1,
            Math.min(
                50,
                value
            )
        );

}


// ========================================
// معرفة حجم القلم
// ========================================

function getBrushSize() {

    return drawingToolState.size;

}


// ========================================
// إعادة الأدوات للوضع الأساسي
// ========================================

function resetDrawingTools() {

    drawingToolState.currentTool = "pen";

    drawingToolState.color = "#222222";

    drawingToolState.size = 5;

}
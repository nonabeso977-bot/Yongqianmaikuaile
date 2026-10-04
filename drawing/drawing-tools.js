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
    },

    eyedropper: {
        name: "القطارة",
        icon: "💧"
    },

    fill: {
        name: "دلو التعبئة",
        icon: "🪣"
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
// اختيار اللون من نقطة في اللوحة
// ========================================

function pickCanvasColor(canvas, x, y) {

    if (!canvas) {
        return null;
    }

    const context =
        canvas.getContext("2d");

    if (!context) {
        return null;
    }

    const pixel =
        context.getImageData(
            x,
            y,
            1,
            1
        ).data;

    if (!pixel) {
        return null;
    }

    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    const hex =
        "#" +
        [r, g, b]
            .map((value) =>
                value
                    .toString(16)
                    .padStart(2, "0")
            )
            .join("");

    setDrawingColor(hex);

    return hex;

}


// ========================================
// تحويل لون HEX إلى RGBA
// ========================================

function hexToRgba(hex) {

    if (
        typeof hex !== "string" ||
        !/^#[0-9a-fA-F]{6}$/.test(hex)
    ) {
        return null;
    }

    return [

        parseInt(
            hex.slice(1, 3),
            16
        ),

        parseInt(
            hex.slice(3, 5),
            16
        ),

        parseInt(
            hex.slice(5, 7),
            16
        ),

        255

    ];

}


// ========================================
// تعبئة منطقة في اللوحة
// ========================================

function fillCanvasArea(canvas, x, y, color) {

    if (!canvas) {
        return false;
    }

    const context =
        canvas.getContext("2d");

    if (!context) {
        return false;
    }

    const width = canvas.width;
    const height = canvas.height;

    if (
        x < 0 ||
        y < 0 ||
        x >= width ||
        y >= height
    ) {
        return false;
    }


    const imageData =
        context.getImageData(
            0,
            0,
            width,
            height
        );

    const pixels = imageData.data;


    const newColor =
        hexToRgba(color);

    if (!newColor) {
        return false;
    }


    const startIndex =
        (y * width + x) * 4;


    const targetColor = [

        pixels[startIndex],

        pixels[startIndex + 1],

        pixels[startIndex + 2],

        pixels[startIndex + 3]

    ];


    if (
        targetColor[0] === newColor[0] &&
        targetColor[1] === newColor[1] &&
        targetColor[2] === newColor[2] &&
        targetColor[3] === newColor[3]
    ) {
        return false;
    }


    const colorMatches =
        (index) => {

            return (

                pixels[index] === targetColor[0] &&

                pixels[index + 1] === targetColor[1] &&

                pixels[index + 2] === targetColor[2] &&

                pixels[index + 3] === targetColor[3]

            );

        };


    const paintPixel =
        (index) => {

            pixels[index] = newColor[0];

            pixels[index + 1] = newColor[1];

            pixels[index + 2] = newColor[2];

            pixels[index + 3] = newColor[3];

        };


    const queue = [

        [x, y]

    ];


    let position = 0;


    while (position < queue.length) {

        const point =
            queue[position++];

        const px = point[0];
        const py = point[1];

        if (
            px < 0 ||
            py < 0 ||
            px >= width ||
            py >= height
        ) {
            continue;
        }


        const index =
            (py * width + px) * 4;


        if (!colorMatches(index)) {
            continue;
        }


        paintPixel(index);


        queue.push(
            [px + 1, py],
            [px - 1, py],
            [px, py + 1],
            [px, py - 1]
        );

    }


    context.putImageData(
        imageData,
        0,
        0
    );


    return true;

}


// ========================================
// إعادة الأدوات للوضع الأساسي
// ========================================

function resetDrawingTools() {

    drawingToolState.currentTool = "pen";

    drawingToolState.color = "#222222";

    drawingToolState.size = 5;

}
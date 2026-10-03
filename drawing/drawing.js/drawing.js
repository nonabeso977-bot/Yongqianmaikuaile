// ========================================
// 🎨 drawing.js
// نظام الرسم الأساسي
// ========================================

const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;


// تحديد حجم اللوحة
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 80;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// بدء الرسم
function startDrawing(event) {
    drawing = true;
    draw(event);
}


// إيقاف الرسم
function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}


// الرسم
function draw(event) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000000";

    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
}


// الماوس
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);


// اللمس على الجوال
canvas.addEventListener("touchstart", (event) => {
    event.preventDefault();

    const touch = event.touches[0];

    startDrawing({
        clientX: touch.clientX,
        clientY: touch.clientY
    });
});

canvas.addEventListener("touchmove", (event) => {
    event.preventDefault();

    const touch = event.touches[0];

    draw({
        clientX: touch.clientX,
        clientY: touch.clientY
    });
});

canvas.addEventListener("touchend", stopDrawing);

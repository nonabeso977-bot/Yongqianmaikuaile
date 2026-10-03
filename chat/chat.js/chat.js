// ========================================
// 💬 chat.js
// نظام الدردشة + الرسم
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    setupChat();
    setupChatDrawing();
});


// ========================================
// 💬 الدردشة
// ========================================

function setupChat() {

    const form = document.getElementById("chatForm");
    const input = document.getElementById("messageInput");
    const messages = document.getElementById("messages");

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const text = input.value.trim();

        if (!text) {
            return;
        }

        const message = document.createElement("div");

        message.className = "message me";

        message.innerHTML = `
            <span class="message-name">أنا</span>
            <p>${escapeHTML(text)}</p>
        `;

        messages.appendChild(message);

        input.value = "";

        messages.scrollTop = messages.scrollHeight;
    });
}


// حماية النص من إدخال HTML
function escapeHTML(text) {

    const element = document.createElement("div");

    element.textContent = text;

    return element.innerHTML;
}


// ========================================
// 🎨 الرسم فوق الدردشة
// ========================================

function setupChatDrawing() {

    const canvas = document.getElementById("chatCanvas");
    const ctx = canvas.getContext("2d");

    const drawButton = document.getElementById("drawButton");
    const clearButton = document.getElementById("clearDrawing");

    let drawing = false;
    let drawingEnabled = false;


    // حجم اللوحة
    function resizeCanvas() {

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);


    // تشغيل / إيقاف الرسم
    drawButton.addEventListener("click", () => {

        drawingEnabled = !drawingEnabled;

        drawButton.textContent =
            drawingEnabled
                ? "🛑 إيقاف الرسم"
                : "🎨 رسم";
    });


    // بداية الرسم
    function startDrawing(event) {

        if (!drawingEnabled) return;

        drawing = true;

        draw(event);
    }


    // نهاية الرسم
    function stopDrawing() {

        drawing = false;

        ctx.beginPath();
    }


    // الرسم
    function draw(event) {

        if (!drawing || !drawingEnabled) return;

        const rect = canvas.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000000";

        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, y);
    }


    // الماوس
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);


    // الجوال
    canvas.addEventListener("touchstart", (event) => {

        if (!drawingEnabled) return;

        event.preventDefault();

        const touch = event.touches[0];

        startDrawing({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
    });


    canvas.addEventListener("touchmove", (event) => {

        if (!drawingEnabled) return;

        event.preventDefault();

        const touch = event.touches[0];

        draw({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
    });


    canvas.addEventListener("touchend", stopDrawing);


    // مسح الرسم
    clearButton.addEventListener("click", () => {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );
    });
}

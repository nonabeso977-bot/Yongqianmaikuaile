document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("drawingCanvas");

    if (!canvas) return;

    setupCanvas(canvas);
    setupDrawingTools(canvas);
    setupZoom(canvas);
    setupPageControls();
    setupSaveButton(canvas);
});

function setupCanvas(canvas) {
    const area = canvas.parentElement;

    const width = Math.max(300, area.clientWidth);
    const height = Math.max(300, area.clientHeight);

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setupDrawingTools(canvas) {
    const penButton = document.getElementById("penTool");
    const eraserButton = document.getElementById("eraserTool");
    const eyedropperButton = document.getElementById("eyedropperTool");
    const fillButton = document.getElementById("fillTool");

    const colorPicker = document.getElementById("colorPicker");
    const brushSize = document.getElementById("brushSize");
    const clearButton = document.getElementById("clearCanvas");

    let drawing = false;

    penButton?.addEventListener("click", () => {
        setDrawingTool("pen");
        updateActiveTool("pen");
    });

    eraserButton?.addEventListener("click", () => {
        setDrawingTool("eraser");
        updateActiveTool("eraser");
    });

    eyedropperButton?.addEventListener("click", () => {
        setDrawingTool("eyedropper");
        updateActiveTool("eyedropper");
    });

    fillButton?.addEventListener("click", () => {
        setDrawingTool("fill");
        updateActiveTool("fill");
    });

    colorPicker?.addEventListener("input", event => {
        setDrawingColor(event.target.value);
        setDrawingTool("pen");
        updateActiveTool("pen");
    });

    brushSize?.addEventListener("input", event => {
        setBrushSize(event.target.value);
    });

    clearButton?.addEventListener("click", () => {
        clearCanvas(canvas);
    });

    canvas.addEventListener("pointerdown", event => {
        const position = getPointerPosition(canvas, event);

        if (!position) return;

        const tool = getDrawingTool();

        if (tool === "eyedropper") {
            pickColorFromCanvas(canvas, position.x, position.y);
            return;
        }

        if (tool === "fill") {
            fillArea(canvas, position.x, position.y);
            return;
        }

        drawing = true;

        canvas.setPointerCapture?.(event.pointerId);

        drawStart(canvas, position.x, position.y);
    });

    canvas.addEventListener("pointermove", event => {
        if (!drawing) return;

        const position = getPointerPosition(canvas, event);

        if (!position) return;

        drawMove(canvas, position.x, position.y);
    });

    canvas.addEventListener("pointerup", () => {
        drawing = false;
        stopDrawing(canvas);
    });

    canvas.addEventListener("pointercancel", () => {
        drawing = false;
        stopDrawing(canvas);
    });
}

function getPointerPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();

    if (!rect.width || !rect.height) return null;

    return {
        x: (event.clientX - rect.left) * (canvas.width / rect.width),
        y: (event.clientY - rect.top) * (canvas.height / rect.height)
    };
}

function drawStart(canvas, x, y) {
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(x, y);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    applyBrushSettings(ctx);
}

function drawMove(canvas, x, y) {
    const ctx = canvas.getContext("2d");

    applyBrushSettings(ctx);

    ctx.lineTo(x, y);
    ctx.stroke();
}

function stopDrawing(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.closePath();
}

function applyBrushSettings(ctx) {
    const tool = getDrawingTool();

    ctx.lineWidth = getBrushSize();

    if (tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(0,0,0,1)";
    } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = getDrawingColor();
    }
}

function clearCanvas(canvas) {
    const ctx = canvas.getContext("2d");

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function pickColorFromCanvas(canvas, x, y) {
    const ctx = canvas.getContext("2d");

    const pixel = ctx.getImageData(
        Math.floor(x),
        Math.floor(y),
        1,
        1
    ).data;

    const hex =
        "#" +
        [pixel[0], pixel[1], pixel[2]]
            .map(value => value.toString(16).padStart(2, "0"))
            .join("");

    setDrawingColor(hex);

    const colorPicker = document.getElementById("colorPicker");

    if (colorPicker) {
        colorPicker.value = hex;
    }

    setDrawingTool("pen");
    updateActiveTool("pen");
}

function fillArea(canvas, startX, startY) {
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const x = Math.floor(startX);
    const y = Math.floor(startY);

    const startIndex = (y * width + x) * 4;

    const targetColor = [
        data[startIndex],
        data[startIndex + 1],
        data[startIndex + 2],
        data[startIndex + 3]
    ];

    const fillColor = hexToRgba(getDrawingColor());

    if (!fillColor) return;

    if (
        targetColor[0] === fillColor[0] &&
        targetColor[1] === fillColor[1] &&
        targetColor[2] === fillColor[2]
    ) {
        return;
    }

    const queue = [[x, y]];
    const visited = new Uint8Array(width * height);

    while (queue.length) {
        const [currentX, currentY] = queue.pop();

        if (
            currentX < 0 ||
            currentX >= width ||
            currentY < 0 ||
            currentY >= height
        ) {
            continue;
        }

        const position = currentY * width + currentX;

        if (visited[position]) continue;

        const index = position * 4;

        if (
            data[index] !== targetColor[0] ||
            data[index + 1] !== targetColor[1] ||
            data[index + 2] !== targetColor[2] ||
            data[index + 3] !== targetColor[3]
        ) {
            continue;
        }

        visited[position] = 1;

        data[index] = fillColor[0];
        data[index + 1] = fillColor[1];
        data[index + 2] = fillColor[2];
        data[index + 3] = 255;

        queue.push([currentX + 1, currentY]);
        queue.push([currentX - 1, currentY]);
        queue.push([currentX, currentY + 1]);
        queue.push([currentX, currentY - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
}

function hexToRgba(hex) {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
        return null;
    }

    return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
        255
    ];
}

function updateActiveTool(activeTool) {
    const buttons = {
        pen: document.getElementById("penTool"),
        eraser: document.getElementById("eraserTool"),
        eyedropper: document.getElementById("eyedropperTool"),
        fill: document.getElementById("fillTool")
    };

    Object.entries(buttons).forEach(([tool, button]) => {
        if (!button) return;

        button.classList.toggle(
            "active",
            tool === activeTool
        );
    });
}

/* =========================
   الزوم
========================= */

function setupZoom(canvas) {
    const zoomInButton = document.getElementById("zoomIn");
    const zoomOutButton = document.getElementById("zoomOut");
    const zoomResetButton = document.getElementById("zoomReset");
    const zoomLevel = document.getElementById("zoomLevel");

    let zoom = 1;

    function updateZoom() {
        canvas.style.transform = `scale(${zoom})`;

        if (zoomLevel) {
            zoomLevel.textContent = `${Math.round(zoom * 100)}%`;
        }
    }

    zoomInButton?.addEventListener("click", () => {
        zoom = Math.min(3, zoom + 0.25);
        updateZoom();
    });

    zoomOutButton?.addEventListener("click", () => {
        zoom = Math.max(0.5, zoom - 0.25);
        updateZoom();
    });

    zoomResetButton?.addEventListener("click", () => {
        zoom = 1;
        updateZoom();
    });

    updateZoom();
}

function setupPageControls() {
    const previousButton = document.getElementById("previousPage");
    const nextButton = document.getElementById("nextPage");

    previousButton?.addEventListener("click", () => {
        if (typeof previousPage === "function") {
            previousPage();
        }
    });

    nextButton?.addEventListener("click", () => {
        if (typeof nextPage === "function") {
            nextPage();
        }
    });
}

function setupSaveButton(canvas) {
    const saveButton = document.getElementById("saveDrawing");

    saveButton?.addEventListener("click", () => {
        const link = document.createElement("a");

        link.download = "my-drawing.png";
        link.href = canvas.toDataURL("image/png");

        link.click();
    });
}
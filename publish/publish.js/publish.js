// ========================================
// 🌟用钱买快乐🌟
// publish.js
// نظام نشر الرسومات
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    loadTheme();

    setupPublish();

});


let selectedImage = null;

function setupPublish() {

    const imageInput =
        document.getElementById("imageInput");

    const description =
        document.getElementById("description");

    const publishButton =
        document.getElementById("publishButton");


    imageInput.addEventListener("change", () => {

        const file = imageInput.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {

            showPublishMessage(
                "اختاري ملف صورة فقط."
            );

            imageInput.value = "";

            return;
        }


        const reader = new FileReader();


        reader.onload = () => {

            selectedImage = reader.result;

            showPreview(selectedImage);

        };


        reader.readAsDataURL(file);
    });


    publishButton.addEventListener("click", () => {

        publishDrawing(
            description.value.trim()
        );

    });
}


function showPreview(image) {

    const preview =
        document.getElementById("preview");


    preview.innerHTML = "";


    const img =
        document.createElement("img");


    img.src = image;

    img.alt = "معاينة الرسم";


    preview.appendChild(img);
}


function publishDrawing(description) {

    if (!selectedImage) {

        showPublishMessage(
            "اختاري رسمة أولًا."
        );

        return;
    }


    const drawings =
        getData("drawings") || [];


    const drawing = {

        image: selectedImage,

        description: description,

        stars: 0,

        date: new Date().toISOString()

    };


    drawings.push(drawing);


    saveData(
        "drawings",
        drawings
    );


    showPublishMessage(
        "تم نشر الرسمة بنجاح 🎨"
    );


    resetPublishForm();
}


function resetPublishForm() {

    const imageInput =
        document.getElementById("imageInput");

    const description =
        document.getElementById("description");

    const preview =
        document.getElementById("preview");


    imageInput.value = "";

    description.value = "";

    selectedImage = null;


    preview.innerHTML = `
        <span>🖼️</span>
        <p>اختاري رسمة لعرضها هنا</p>
    `;
}


function showPublishMessage(message) {

    const element =
        document.getElementById("publishMessage");


    element.textContent = message;


    setTimeout(() => {

        element.textContent = "";

    }, 2500);
    }

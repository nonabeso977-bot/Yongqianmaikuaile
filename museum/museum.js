// ========================================
// 🏛️ museum.js
// نظام المتحف الفني
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    setupMuseum();
});


// تشغيل الأعمال الفنية
function setupMuseum() {

    const artworks = document.querySelectorAll(".artwork");

    artworks.forEach((artwork) => {

        artwork.addEventListener("click", () => {

            const artId = artwork.dataset.art;

            openArtwork(artId);
        });

    });
}


// عرض معلومات العمل الفني
function openArtwork(artId) {

    const messages = {
        1: "🎨 العمل الفني رقم 1",
        2: "🖼️ العمل الفني رقم 2",
        3: "🌟 العمل الفني رقم 3",
        4: "🐱 العمل الفني رقم 4",
        5: "🌸 العمل الفني رقم 5",
        6: "🌙 العمل الفني رقم 6"
    };

    showMessage(
        messages[artId] || "هذا العمل غير موجود."
    );
}
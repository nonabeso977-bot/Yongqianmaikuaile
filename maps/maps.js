// ========================================
// 🗺️ maps.js
// نظام الخرائط والغرف
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    setupMaps();
});


// تشغيل غرف الخرائط
function setupMaps() {
    const rooms = document.querySelectorAll(".map-room");

    rooms.forEach((room) => {
        room.addEventListener("click", () => {
            const map = room.dataset.map;

            openMap(map);
        });
    });
}


// فتح الخريطة المطلوبة
function openMap(map) {

    switch (map) {

        case "guess":
            showMessage("🎨 احزر إيش برسم");
            break;

        case "continue":
            showMessage("✏️ كمّل على رسمتي");
            break;

        case "lonely":
            showMessage("🧑‍🎨 فنان متوحد");
            break;

        case "tea":
            showMessage("🍵 مجتمعين على الشاي");
            break;

        case "teacher":
            showMessage("📚 أنا المعلم");
            break;

        case "museum":
            goTo("../museum/museum.html");
            break;

        default:
            showMessage("الخريطة غير موجودة.");
    }
}
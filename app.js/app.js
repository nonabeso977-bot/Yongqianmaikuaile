// ========================================
// 🌟用钱买快乐🌟
// app.js
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("🌟用钱买快乐🌟 يعمل بنجاح!");

    setupRooms();
});


// إعداد غرف الصفحة الرئيسية
function setupRooms() {
    const rooms = document.querySelectorAll("[data-room]");

    rooms.forEach((room) => {
        room.addEventListener("click", () => {
            const page = room.dataset.room;

            if (page) {
                goTo(page);
            }
        });
    });
}

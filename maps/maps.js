// ========================================
// 🗺️ 用钱买快乐
// maps.js
// ماب: احزر
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    setupMaps();

});


// ========================================
// تشغيل ماب احزر
// ========================================

function setupMaps() {

    const rooms =
        document.querySelectorAll(
            ".map-room"
        );


    rooms.forEach((room) => {

        room.addEventListener(
            "click",
            () => {

                const map =
                    room.dataset.map;


                openMap(map);

            }
        );

    });

}


// ========================================
// فتح الماب
// ========================================

function openMap(map) {

    switch (map) {

        case "guess":

            showMessage(
                "🎨 ماب احزر"
            );

            break;


        default:

            showMessage(
                "الماب غير موجود."
            );

    }

}
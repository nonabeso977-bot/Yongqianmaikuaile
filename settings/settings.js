// ========================================
// 🌟用钱买快乐🌟
// settings.js
// نظام الإعدادات
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    loadSettings();
    setupSettings();
});

function loadSettings() {

    const settings = getData("settings");

    const themeSelect =
        document.getElementById("themeSelect");

    const fontSize =
        document.getElementById("fontSize");

    const notifications =
        document.getElementById("notifications");


    // تحميل الثيم
    const savedTheme = getData("theme");

    if (savedTheme && themes[savedTheme]) {
        themeSelect.value = savedTheme;
        applyTheme(savedTheme);
    } else {
        themeSelect.value = "default";
        applyTheme("default");
    }


    // تحميل باقي الإعدادات
    if (!settings) {
        applyFontSize("medium");
        return;
    }


    if (settings.fontSize) {
        fontSize.value = settings.fontSize;
    }


    if (typeof settings.notifications === "boolean") {
        notifications.checked =
            settings.notifications;
    }


    applyFontSize(
        settings.fontSize || "medium"
    );
}


function setupSettings() {

    const themeSelect =
        document.getElementById("themeSelect");

    const fontSize =
        document.getElementById("fontSize");

    const notifications =
        document.getElementById("notifications");

    const clearData =
        document.getElementById("clearData");


    // تغيير الثيم
    themeSelect.addEventListener("change", () => {

        applyTheme(themeSelect.value);

        showSettingsMessage(
            "تم تغيير الثيم."
        );
    });


    // تغيير حجم الخط
    fontSize.addEventListener("change", () => {

        applyFontSize(fontSize.value);

        saveSettings();

    });


    // الإشعارات
    notifications.addEventListener("change", () => {

        saveSettings();

    });


    // حذف البيانات
    clearData.addEventListener("click", () => {

        const confirmed = confirm(
            "هل أنت متأكد من حذف البيانات المحفوظة على هذا الجهاز؟"
        );

        if (!confirmed) {
            return;
        }


        localStorage.clear();


        // إعادة الثيم والحجم للوضع الافتراضي
        applyTheme("default");
        applyFontSize("medium");


        themeSelect.value = "default";
        fontSize.value = "medium";
        notifications.checked = true;


        showSettingsMessage(
            "تم حذف البيانات المحلية."
        );

    });
}


function saveSettings() {

    const settings = {

        fontSize:
            document.getElementById("fontSize").value,

        notifications:
            document.getElementById("notifications").checked

    };


    saveData("settings", settings);


    showSettingsMessage(
        "تم حفظ الإعدادات."
    );
}


function applyFontSize(size) {

    const sizes = {

        small: "14px",

        medium: "16px",

        large: "19px"

    };


    document.documentElement.style.fontSize =
        sizes[size] || sizes.medium;
}


function showSettingsMessage(message) {

    const element =
        document.getElementById("settingsMessage");


    element.textContent = message;


    setTimeout(() => {

        element.textContent = "";

    }, 2000);
}
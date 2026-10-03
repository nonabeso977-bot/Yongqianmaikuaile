// ========================================
// ⚙️ settings.js
// نظام الإعدادات
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    loadSettings();
    setupSettings();
});


// تحميل الإعدادات المحفوظة
function loadSettings() {

    const settings = getData("settings");

    if (!settings) {
        return;
    }

    const fontSize = document.getElementById("fontSize");
    const notifications = document.getElementById("notifications");

    if (settings.fontSize) {
        fontSize.value = settings.fontSize;
    }

    if (typeof settings.notifications === "boolean") {
        notifications.checked = settings.notifications;
    }

    applyFontSize(settings.fontSize || "medium");
}


// تشغيل الإعدادات
function setupSettings() {

    const fontSize = document.getElementById("fontSize");
    const notifications = document.getElementById("notifications");
    const clearData = document.getElementById("clearData");

    fontSize.addEventListener("change", () => {

        applyFontSize(fontSize.value);

        saveSettings();
    });


    notifications.addEventListener("change", () => {

        saveSettings();
    });


    clearData.addEventListener("click", () => {

        const confirmed = confirm(
            "هل أنت متأكد من حذف البيانات المحفوظة على هذا الجهاز؟"
        );

        if (!confirmed) {
            return;
        }

        localStorage.clear();

        showSettingsMessage(
            "تم حذف البيانات المحلية."
        );
    });
}


// حفظ الإعدادات
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


// تطبيق حجم الخط
function applyFontSize(size) {

    const sizes = {

        small: "14px",

        medium: "16px",

        large: "19px"
    };

    document.documentElement.style.fontSize =
        sizes[size] || sizes.medium;
}


// رسالة الإعدادات
function showSettingsMessage(message) {

    const element =
        document.getElementById("settingsMessage");

    element.textContent = message;

    setTimeout(() => {
        element.textContent = "";
    }, 2000);
}

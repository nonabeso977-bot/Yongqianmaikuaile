// ========================================
// 🌟用钱买快乐🌟
// themes.js
// نظام الثيمات
// ========================================

const themes = {

    default: {
        name: "الأبيض",
        background: "#ffffff",
        text: "#222222",
        border: "#222222",
        secondary: "#777777",
        button: "#ffffff"
    },

    pink: {
        name: "وردي",
        background: "#fff5fa",
        text: "#402632",
        border: "#d98aaa",
        secondary: "#9b657b",
        button: "#fffafd"
    },

    purple: {
        name: "بنفسجي",
        background: "#faf7ff",
        text: "#352545",
        border: "#9b7bc7",
        secondary: "#77618f",
        button: "#fdfaff"
    },

    blue: {
        name: "أزرق",
        background: "#f5fbff",
        text: "#203746",
        border: "#78aeca",
        secondary: "#63808f",
        button: "#fbfeff"
    },

    green: {
        name: "أخضر",
        background: "#f6fff8",
        text: "#263b2b",
        border: "#7eaf8b",
        secondary: "#64816b",
        button: "#fbfffc"
    },

    peach: {
        name: "خوخي",
        background: "#fff9f4",
        text: "#493126",
        border: "#d49b7b",
        secondary: "#987464",
        button: "#fffdfb"
    }
};


// تطبيق الثيم
function applyTheme(themeName) {

    const theme = themes[themeName];

    if (!theme) {
        return;
    }

    const root = document.documentElement;

    root.style.setProperty(
        "--background",
        theme.background
    );

    root.style.setProperty(
        "--text",
        theme.text
    );

    root.style.setProperty(
        "--border",
        theme.border
    );

    root.style.setProperty(
        "--secondary",
        theme.secondary
    );

    root.style.setProperty(
        "--button-bg",
        theme.button
    );

    saveData("theme", themeName);
}


// تحميل الثيم المحفوظ
function loadTheme() {

    const savedTheme = getData("theme");

    if (savedTheme && themes[savedTheme]) {
        applyTheme(savedTheme);
    } else {
        applyTheme("default");
    }
}


// تشغيل الثيم عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
});

// ========================================
// 🌟用钱买快乐🌟
// functions.js
// الوظائف المشتركة في التطبيق
// ========================================


// إظهار رسالة بسيطة للمستخدم
function showMessage(message) {
    alert(message);
}


// الانتقال إلى صفحة أخرى
function goTo(page) {
    window.location.href = page;
}


// حفظ بيانات بسيطة في الجهاز
function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


// قراءة بيانات محفوظة
function getData(key) {
    const data = localStorage.getItem(key);

    if (data === null) {
        return null;
    }

    try {
        return JSON.parse(data);
    } catch {
        return data;
    }
}


// حذف بيانات محفوظة
function deleteData(key) {
    localStorage.removeItem(key);
}


// إنشاء عنصر HTML بسهولة
function createElement(tag, className = "", text = "") {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text) {
        element.textContent = text;
    }

    return element;
}


// إظهار عنصر
function showElement(element) {
    if (element) {
        element.style.display = "";
    }
}


// إخفاء عنصر
function hideElement(element) {
    if (element) {
        element.style.display = "none";
    }
}


// تبديل إظهار/إخفاء عنصر
function toggleElement(element) {
    if (!element) return;

    if (element.style.display === "none") {
        showElement(element);
    } else {
        hideElement(element);
    }
                       }

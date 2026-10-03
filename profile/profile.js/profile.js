// ========================================
// 👤 profile.js
// نظام الحساب والملف الشخصي
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
    loadGallery();
});


// تحميل بيانات الحساب
function loadProfile() {

    const profile = getData("profile");

    if (!profile) {
        return;
    }

    const username = document.getElementById("username");
    const bio = document.getElementById("bio");

    if (profile.username) {
        username.textContent = profile.username;
    }

    if (profile.bio) {
        bio.textContent = profile.bio;
    }
}


// تحميل الرسومات
function loadGallery() {

    const gallery = document.getElementById("gallery");

    const drawings = getData("drawings");

    if (!drawings || drawings.length === 0) {
        return;
    }

    gallery.innerHTML = "";

    drawings.forEach((drawing, index) => {

        const artwork = document.createElement("div");

        artwork.className = "profile-artwork";

        artwork.innerHTML = `
            <img src="${drawing.image}" alt="رسمتي ${index + 1}">
            <span>⭐ ${drawing.stars || 0}</span>
        `;

        gallery.appendChild(artwork);
    });
}

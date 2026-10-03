// ========================================
// 🌟用钱买快乐🌟
// profile.js
// نظام الحساب والملف الشخصي
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    loadProfile();

    loadStats();

    loadBadges();

    loadGallery();

});


// ========================================
// 👤 معلومات الحساب
// ========================================

function loadProfile() {

    const profile =
        getData("profile");

    if (!profile) {
        return;
    }


    const username =
        document.getElementById("username");

    const bio =
        document.getElementById("bio");


    if (profile.username) {

        username.textContent =
            profile.username;

    }


    if (profile.bio) {

        bio.textContent =
            profile.bio;

    }

}


// ========================================
// 📊 الإحصائيات
// ========================================

function loadStats() {

    const drawings =
        getData("drawings") || [];


    const totalStars =
        getTotalStars();


    const starsCount =
        document.getElementById("starsCount");

    const drawingsCount =
        document.getElementById("drawingsCount");

    const badgesCount =
        document.getElementById("badgesCount");


    starsCount.textContent =
        totalStars;


    drawingsCount.textContent =
        drawings.length;


    badgesCount.textContent =
        getUnlockedBadges().length;

}


// ========================================
// 🏅 الأوسمة
// ========================================

function loadBadges() {

    const container =
        document.getElementById("badges");


    const unlockedBadges =
        getUnlockedBadges();


    container.innerHTML = "";


    badges.forEach((badge) => {

        const element =
            document.createElement("div");


        const unlocked =
            unlockedBadges.some(
                (item) =>
                    item.id === badge.id
            );


        element.className =
            unlocked
                ? "badge"
                : "badge locked";


        element.innerHTML = `

            <span class="badge-icon">
                ${badge.icon}
            </span>

            <strong>
                ${badge.name}
            </strong>

            <small>
                ${badge.requirement} نجمة
            </small>

        `;


        container.appendChild(element);

    });

}


// ========================================
// 🎨 الرسومات
// ========================================

function loadGallery() {

    const gallery =
        document.getElementById("gallery");


    const drawings =
        getData("drawings");


    if (!drawings || drawings.length === 0) {

        return;

    }


    gallery.innerHTML = "";


    drawings.forEach(
        (drawing, index) => {

            const artwork =
                document.createElement("div");


            artwork.className =
                "profile-artwork";


            const image =
                document.createElement("img");


            image.src =
                drawing.image;

            image.alt =
                `رسمتي ${index + 1}`;


            const stars =
                document.createElement("span");


            stars.textContent =
                `⭐ ${drawing.stars || 0}`;


            artwork.appendChild(image);

            artwork.appendChild(stars);


            if (drawing.description) {

                const description =
                    document.createElement("p");


                description.textContent =
                    drawing.description;


                artwork.appendChild(
                    description
                );

            }


            gallery.appendChild(
                artwork
            );

        }
    );

}
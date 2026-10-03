// ========================================
// 🌟用钱买快乐🌟
// badges.js
// نظام الأوسمة
// ========================================

const badges = [

    {
        id: "artist",
        name: "فنان",
        icon: "🎨",
        requirement: 10,
        type: "stars"
    },

    {
        id: "van-gogh",
        name: "فان كوخ",
        icon: "🌟",
        requirement: 20,
        type: "stars"
    },

    {
        id: "master",
        name: "فنان محترف",
        icon: "🏆",
        requirement: 50,
        type: "stars"
    },

    {
        id: "legend",
        name: "أسطورة الفن",
        icon: "👑",
        requirement: 100,
        type: "stars"
    }

];


// حساب مجموع النجوم
function getTotalStars() {

    const drawings =
        getData("drawings") || [];

    return drawings.reduce(
        (total, drawing) => {

            return total +
                Number(drawing.stars || 0);

        },
        0
    );
}


// معرفة الأوسمة المفتوحة
function getUnlockedBadges() {

    const totalStars =
        getTotalStars();

    return badges.filter((badge) => {

        return totalStars >= badge.requirement;

    });
}


// معرفة هل وسام معين مفتوح
function isBadgeUnlocked(badgeId) {

    const totalStars =
        getTotalStars();

    const badge =
        badges.find(
            (item) => item.id === badgeId
        );

    if (!badge) {
        return false;
    }

    return totalStars >= badge.requirement;
}

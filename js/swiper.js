const swiper = new Swiper('.category__slider', {
    slidesPerView: 1,
    pagination: {
        el: '.category__pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass}"></span> из <span class="${totalClass}"></span>`;
        }
    },
    navigation: {
        nextEl: '.category__next',
        prevEl: '.category__prev',
    },
});
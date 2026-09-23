const clientSwiper = new Swiper(".clientSwiper", {

    slidesPerView: 1.15,
    spaceBetween: 20,

    loop: true,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },

    speed: 700,

    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },

    breakpoints: {
        0: {
            slidesPerView: 1.1,
            spaceBetween: 15
        },

        768: {
            slidesPerView: 1.3,
            spaceBetween: 20
        },

        992: {
            slidesPerView: 1.7,
            spaceBetween: 25
        }
    }

});
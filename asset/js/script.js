/* ========================================
 Client Experience Swiper
========================================= */


const clientSwiper = new Swiper(".clientSwiper", {


slidesPerView:2,


spaceBetween:20,


loop:true,


autoplay:{


delay:3000,


disableOnInteraction:false


},



speed:700,



pagination:{


el:".swiper-pagination",


clickable:true


},



breakpoints:{


0:{


slidesPerView:1


},



992:{


slidesPerView:2


}



}



});
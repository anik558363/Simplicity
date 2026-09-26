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



document.addEventListener("DOMContentLoaded", function () {

  // ========================================
  // Auto active nav link based on current page
  // ========================================
  var navLinks = document.querySelectorAll(".main-nav .nav-link");
  var currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(function (link) {
    var linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

});



// document.addEventListener("DOMContentLoaded", function () {

//   // ========================================
//   // Fixed header background on scroll
//   // ========================================
//   var siteHeader = document.querySelector(".site-header");

//   function toggleHeaderScrolled() {
//     if (window.scrollY > 20) {
//       siteHeader.classList.add("scrolled");
//     } else {
//       siteHeader.classList.remove("scrolled");
//     }
//   }

//   if (siteHeader) {
//     window.addEventListener("scroll", toggleHeaderScrolled);
//     toggleHeaderScrolled(); // পেজ লোড হওয়ার সাথে সাথেই একবার চেক করবে
//   }

// });
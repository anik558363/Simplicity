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
      slidesPerView: 1,
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
  // (works with both relative and absolute href)
  // ========================================
  var navLinks = document.querySelectorAll(".main-nav .nav-link");
  var currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(function (link) {
    // link.href (property, getAttribute না) ব্রাউজার সবসময় resolve করে
    // পূর্ণ absolute URL হিসেবে দেয়, তারপর সেখান থেকে শুধু ফাইলের নামটা বের করছি
    var linkPage = new URL(link.href, window.location.origin).pathname.split("/").pop() || "index.html";

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

});


document.addEventListener("DOMContentLoaded", function () {

  // ========================================
  // Fixed header background on scroll
  // ========================================
  var siteHeader = document.querySelector(".site-header");

  function toggleHeaderScrolled() {
    if (window.scrollY > 20) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  }

  if (siteHeader) {
    window.addEventListener("scroll", toggleHeaderScrolled);
    toggleHeaderScrolled(); // পেজ লোড হওয়ার সাথে সাথেই একবার চেক করবে
  }

});


document.addEventListener("DOMContentLoaded", function () {

  // ========================================
  // Mobile hamburger menu toggle
  // ========================================
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");
  var navIcon = navToggle ? navToggle.querySelector("i") : null;

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (navIcon) {
        navIcon.classList.toggle("fa-bars", !isOpen);
        navIcon.classList.toggle("fa-xmark", isOpen);
      }
    });

    // Menu-er kono link-e click korle menu ta automatically bondho hoye jabe
    mainNav.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        if (navIcon) {
          navIcon.classList.add("fa-bars");
          navIcon.classList.remove("fa-xmark");
        }
      });
    });
  }

});
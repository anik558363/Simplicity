// ========================================
// Contact Form - AJAX Submit Handler
// একই কোড এখন সাইটের যেকোনো পেজের যেকোনো .contact-form-এ কাজ করবে
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  var forms = document.querySelectorAll(".contact-form");

  forms.forEach(function (form) {
    var statusBox = form.querySelector(".form-status");
    var submitBtn = form.querySelector('[type="submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (submitBtn) submitBtn.setAttribute("disabled", "disabled");
      showStatus(statusBox, "Sending your message...", "pending");

      var formData = new FormData(form);

      fetch("send-mail.php", {
        method: "POST",
        body: formData
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          showStatus(statusBox, data.message, data.success ? "success" : "error");
          if (data.success) {
            form.reset();
          }
        })
        .catch(function () {
          showStatus(statusBox, "Something went wrong. Please try again in a moment.", "error");
        })
        .finally(function () {
          if (submitBtn) submitBtn.removeAttribute("disabled");
        });
    });
  });

  function showStatus(box, message, type) {
    if (!box) return;
    box.textContent = message;
    box.className = "form-status form-status-" + type;
  }

});
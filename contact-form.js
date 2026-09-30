// ========================================
// Contact Form - AJAX Submit Handler
// Sends the form to send-mail.php without reloading the page
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    var form = document.getElementById("contactForm");
    if (!form) return;

    var statusBox = document.getElementById("formStatus");
    var submitBtn = document.getElementById("submitBtn");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        submitBtn.setAttribute("disabled", "disabled");
        showStatus("Sending your message...", "pending");

        var formData = new FormData(form);

        fetch("send-mail.php", {
            method: "POST",
            body: formData
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                showStatus(data.message, data.success ? "success" : "error");
                if (data.success) {
                    form.reset();
                }
            })
            .catch(function () {
                showStatus("Something went wrong. Please try again in a moment.", "error");
            })
            .finally(function () {
                submitBtn.removeAttribute("disabled");
            });
    });

    function showStatus(message, type) {
        statusBox.textContent = message;
        statusBox.className = "form-status form-status-" + type;
    }

});

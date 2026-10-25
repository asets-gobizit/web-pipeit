/* Pipe IT site behaviour: mobile nav, FormSubmit forms, reduced motion. */
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    nav.classList.remove("is-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  }

  function showStatus(form, message, isError) {
    var status = form.querySelector(".form-status");
    if (!status) return;
    status.hidden = false;
    status.textContent = message;
    status.classList.toggle("is-error", !!isError);
  }

  document.querySelectorAll("form[data-formsubmit]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var successText = form.getAttribute("data-success") || "Thanks. Your message has been sent.";
      var errorText = form.getAttribute("data-error") || "Sorry, that could not be sent. Please email pipeit@gobizit.com.";
      var honey = form.querySelector('[name="_honey"]');
      if (honey && String(honey.value).trim() !== "") {
        showStatus(form, successText, false);
        form.reset();
        return;
      }

      var button = form.querySelector('[type="submit"]');
      if (button) button.disabled = true;

      var payload = {};
      new FormData(form).forEach(function (value, key) {
        payload[key] = value;
      });
      /* AJAX cannot complete FormSubmit's reCAPTCHA redirect, so captcha is off for this request only. */
      payload._captcha = "false";

      fetch(form.getAttribute("data-formsubmit"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          return response.json().then(
            function (body) {
              return { ok: response.ok, body: body };
            },
            function () {
              return { ok: response.ok, body: null };
            }
          );
        })
        .then(function (result) {
          var flagged = result.body && (result.body.success === false || result.body.success === "false");
          if (result.ok && !flagged) {
            showStatus(form, successText, false);
            form.reset();
          } else {
            showStatus(form, errorText, true);
          }
        })
        .catch(function () {
          showStatus(form, errorText, true);
        })
        .then(function () {
          if (button) button.disabled = false;
        });
    });
  });

  var motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motion.matches) {
    document.querySelectorAll("video").forEach(function (video) {
      video.removeAttribute("autoplay");
      video.pause();
      video.controls = true;
    });
  }
})();

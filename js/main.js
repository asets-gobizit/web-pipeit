/* Pipe IT site behaviour: mobile nav, mailto forms, reduced motion. */
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

  function buildMailto(form) {
    var to = form.getAttribute("data-mailto");
    var subject = form.getAttribute("data-subject") || "Message from the Pipe IT website";
    var lines = [];
    var data = new FormData(form);
    data.forEach(function (value, key) {
      var text = String(value).trim();
      if (!text) return;
      var label = key.replace(/[_-]+/g, " ");
      label = label.charAt(0).toUpperCase() + label.slice(1);
      lines.push(label + ": " + text);
    });
    return (
      "mailto:" +
      to +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(lines.join("\n\n"))
    );
  }

  document.querySelectorAll("form[data-mailto]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var href = buildMailto(form);
      form.dataset.lastMailto = href;
      var status = form.querySelector(".form-status");
      if (status) {
        status.hidden = false;
        status.textContent = "Opening your email app, addressed to " + form.getAttribute("data-mailto") + ".";
      }
      window.location.href = href;
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

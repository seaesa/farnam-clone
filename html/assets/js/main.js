(function () {
  "use strict";

  // Footer copyright year
  document.querySelectorAll("#footerYear").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mobile nav toggle
  var menuToggle = document.getElementById("mobileMenuToggle");
  var primaryNav = document.getElementById("primaryNav");
  var navOverlay = document.getElementById("navOverlay");

  function closeNav() {
    if (primaryNav) primaryNav.classList.remove("is-open");
    if (navOverlay) navOverlay.classList.remove("is-visible");
  }

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", function () {
      primaryNav.classList.toggle("is-open");
      if (navOverlay) navOverlay.classList.toggle("is-visible");
    });
  }
  if (navOverlay) {
    navOverlay.addEventListener("click", closeNav);
  }

  // Lightweight search panel for the static clone.
  var searchToggles = document.querySelectorAll(".search-toggle");
  var searchPanel = document.getElementById("searchPanel");
  var searchInput = document.getElementById("siteSearch");
  if (searchToggles.length && searchPanel) {
    searchToggles.forEach(function (searchToggle) {
      searchToggle.addEventListener("click", function () {
      var open = searchPanel.classList.toggle("is-open");
      searchToggles.forEach(function (toggle) {
        toggle.setAttribute("aria-expanded", String(open));
      });
      if (open && searchInput) searchInput.focus();
      });
    });
    searchPanel.addEventListener("submit", function (e) {
      e.preventDefault();
      if (searchInput && searchInput.value.trim()) {
        window.alert("Search is a demo interaction in this static clone: " + searchInput.value.trim());
      }
    });
  }

  // Newsletter form (demo — no backend)
  var newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.getElementById("newsletterNote");
      var email = newsletterForm.querySelector('input[name="email_address"]').value;
      if (note) {
        note.textContent = "Thanks! We've added " + email + " to the list. (Demo only — no email is actually sent.)";
      }
      newsletterForm.reset();
    });
  }

  // Pay-what-you-want form (demo — no backend)
  var pwywForm = document.getElementById("pwywForm");
  if (pwywForm) {
    pwywForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = pwywForm.querySelector('input[name="price"]');
      window.alert("Thanks for your support! ($" + input.value + "/year selected). This is a demo checkout — no payment is processed.");
    });
  }

  // "See older articles" — demo pagination
  var loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function (e) {
      e.preventDefault();
      loadMoreBtn.textContent = "You've reached the end (demo)";
      loadMoreBtn.style.pointerEvents = "none";
      loadMoreBtn.style.opacity = "0.6";
    });
  }

  // Login popup (opens as a modal over the current page instead of navigating away)
  var authModal = document.getElementById("authModal");
  if (authModal) {
    var authModalClose = document.getElementById("authModalClose");
    var authModalBackdrop = document.getElementById("authModalBackdrop");

    var openAuthModal = function () {
      authModal.classList.add("is-open");
      document.body.classList.add("auth-modal-open");
      var emailInput = document.getElementById("email");
      if (emailInput) emailInput.focus();
    };
    var closeAuthModal = function () {
      authModal.classList.remove("is-open");
      document.body.classList.remove("auth-modal-open");
    };

    document.querySelectorAll(".nav-login").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        openAuthModal();
      });
    });
    if (authModalClose) authModalClose.addEventListener("click", closeAuthModal);
    if (authModalBackdrop) authModalBackdrop.addEventListener("click", closeAuthModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && authModal.classList.contains("is-open")) closeAuthModal();
    });
  }

  // Login / Sign up toggle (demo — no backend auth)
  var authForm = document.getElementById("authForm");
  if (authForm) {
    var authTitle = document.getElementById("authTitle");
    var authSub = document.getElementById("authSub");
    var authSubmit = document.getElementById("authSubmit");
    var nameField = document.getElementById("nameField");
    var forgotRow = document.getElementById("forgotRow");
    var authSwitch = document.getElementById("authSwitch");
    var switchToSignup = document.getElementById("switchToSignup");
    var authError = document.getElementById("authError");
    var isSignup = false;

    function renderMode() {
      if (isSignup) {
        authTitle.textContent = "Create your Farnam Street account";
        authSub.textContent = "Join to save articles and manage your membership.";
        authSubmit.textContent = "Sign Up";
        nameField.style.display = "block";
        document.getElementById("fullName").required = true;
        forgotRow.style.display = "none";
        authSwitch.innerHTML = 'Already have an account? <a href="#" id="switchToSignup">Log in</a>';
      } else {
        authTitle.textContent = "Log In to Farnam Street";
        authSub.textContent = "Welcome back. Access your membership content below.";
        authSubmit.textContent = "Log In";
        nameField.style.display = "none";
        document.getElementById("fullName").required = false;
        forgotRow.style.display = "block";
        authSwitch.innerHTML = 'Don&rsquo;t have an account? <a href="#" id="switchToSignup">Sign up</a>';
      }
      authError.classList.remove("is-visible");
      document.getElementById("switchToSignup").addEventListener("click", handleSwitchClick);
    }

    function handleSwitchClick(e) {
      e.preventDefault();
      isSignup = !isSignup;
      renderMode();
    }

    if (switchToSignup) {
      switchToSignup.addEventListener("click", handleSwitchClick);
    }

    authForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("email").value.trim();
      var password = document.getElementById("password").value.trim();
      var name = document.getElementById("fullName").value.trim();

      if (!email || !password || (isSignup && !name)) {
        authError.textContent = "Please fill in all fields to continue.";
        authError.classList.add("is-visible");
        return;
      }
      authError.classList.remove("is-visible");
      window.alert((isSignup ? "Account created" : "Logged in") + " for " + email + ". This is a demo form — no real authentication occurs.");
      authForm.reset();
    });
  }
})();

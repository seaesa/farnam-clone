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

  // "Bài viết" nav dropdown
  document.querySelectorAll(".nav-item").forEach(function (navItem) {
    var caret = navItem.querySelector(".nav-caret");
    if (!caret) return;
    caret.addEventListener("click", function (e) {
      e.preventDefault();
      var open = navItem.classList.toggle("is-open");
      caret.setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".nav-item.is-open").forEach(function (navItem) {
      if (!navItem.contains(e.target)) {
        navItem.classList.remove("is-open");
        var caret = navItem.querySelector(".nav-caret");
        if (caret) caret.setAttribute("aria-expanded", "false");
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".nav-item.is-open").forEach(function (navItem) {
        navItem.classList.remove("is-open");
        var caret = navItem.querySelector(".nav-caret");
        if (caret) caret.setAttribute("aria-expanded", "false");
      });
    }
  });

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
        window.alert("Tìm kiếm là tương tác demo trên bản clone tĩnh này: " + searchInput.value.trim());
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
        note.textContent = "Cảm ơn! Đã thêm " + email + " vào danh sách. (Chỉ là demo — không có email nào thực sự được gửi.)";
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
      window.alert("Cảm ơn bạn đã ủng hộ! (Đã chọn " + input.value + "₫/năm). Đây là demo — chưa có khoản thanh toán nào được xử lý.");
    });
  }

  // "See older articles" — demo pagination
  var loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function (e) {
      e.preventDefault();
      loadMoreBtn.textContent = "Bạn đã xem hết bài viết (demo)";
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
        authTitle.textContent = "Tạo tài khoản của bạn";
        authSub.textContent = "Đăng ký để lưu bài viết và quản lý gói thành viên.";
        authSubmit.textContent = "Đăng ký";
        nameField.style.display = "block";
        document.getElementById("fullName").required = true;
        forgotRow.style.display = "none";
        authSwitch.innerHTML = 'Đã có tài khoản? <a href="#" id="switchToSignup">Đăng nhập</a>';
      } else {
        authTitle.textContent = "Đăng nhập";
        authSub.textContent = "Chào mừng bạn quay lại. Truy cập nội dung thành viên bên dưới.";
        authSubmit.textContent = "Đăng nhập";
        nameField.style.display = "none";
        document.getElementById("fullName").required = false;
        forgotRow.style.display = "block";
        authSwitch.innerHTML = 'Chưa có tài khoản? <a href="#" id="switchToSignup">Đăng ký</a>';
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
        authError.textContent = "Vui lòng điền đầy đủ thông tin để tiếp tục.";
        authError.classList.add("is-visible");
        return;
      }
      authError.classList.remove("is-visible");
      window.alert((isSignup ? "Đã tạo tài khoản" : "Đã đăng nhập") + " cho " + email + ". Đây là form demo — không có xác thực thực sự nào diễn ra.");
      authForm.reset();
    });
  }
})();

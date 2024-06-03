document.addEventListener("DOMContentLoaded", function () {
  const togglePasswordVisibility = (target) => {
    const passwordInput = document.getElementById(target);
    const toggleIcon = document.querySelector(
      `.hide-password[data-target="${target}"] i`
    );
    const toggleText = document.querySelector(
      `.hide-password[data-target="${target}"] span`
    );
    const passwordVisible = passwordInput.type === "password";

    passwordInput.type = passwordVisible ? "text" : "password";
    toggleIcon.classList.toggle("fa-eye", !passwordVisible);
    toggleIcon.classList.toggle("fa-eye-slash", passwordVisible);
    toggleText.innerText = passwordVisible ? "Hide" : "Show";
  };

  document.querySelectorAll(".hide-password").forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      togglePasswordVisibility(target);
    });
  });
});

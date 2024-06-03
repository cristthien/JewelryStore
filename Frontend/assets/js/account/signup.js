const loginSection = document.querySelector(".login-container");

document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("toggle-icon");
  const toggleText = document.getElementById("toggle-text");
  const signUpStatus = this.getElementById("sign-up-status");
  const inputs = Array.from(document.querySelectorAll(".login__input"));
  let passwordVisible = false;
  const signUpBtn = document.getElementById("login-account-btn");

  signUpBtn.addEventListener("click", function () {
    const [name, email, password] = inputs.map((input) => input.value);
    const data = {
      email,
      password,
      name,
    };
    console.log(data);

    const url = "http://localhost:3000/customer/signup";

    axios
      .post(url, data)
      .then((response) => {
        const payload = response.data;
        if (payload.error) {
          console.log("failure");
          signUpStatus.innerHTML = payload.message;
          signUpStatus.style.display = "block";
        } else {
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  });
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      signUpStatus.style.display = "none";
    });
  });

  toggleIcon.addEventListener("click", function () {
    passwordVisible = !passwordVisible;
    if (passwordVisible) {
      passwordInput.type = "text";
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
      toggleText.innerText = "Hide";
    } else {
      passwordInput.type = "password";
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
      toggleText.innerText = "Show";
    }
  });

  toggleText.addEventListener("click", function () {
    passwordVisible = !passwordVisible;
    if (passwordVisible) {
      passwordInput.type = "text";
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
      toggleText.innerText = "Hide";
    } else {
      passwordInput.type = "password";
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
      toggleText.innerText = "Show";
    }
  });
});

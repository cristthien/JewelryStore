document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("toggle-icon");
  const toggleText = document.getElementById("toggle-text");
  const loginFailure = document.getElementById("login-fail");
  const inputs = Array.from(document.querySelectorAll(".login__input"));
  const logInGoogle = document.getElementById("login-with-google");

  let passwordVisible = false;
  const loginBtn = document.getElementById("login-account-btn");

  logInGoogle.addEventListener("click", () => {
    window.location.href = "/auth/google";
  });

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      loginFailure.style.display = "none";
    });
  });
  loginBtn.addEventListener("click", function () {
    const [email, password] = inputs.map((input) => input.value);
    const data = {
      email: email,
      password: password,
    };

    const url = "http://localhost:3000/customer/login";

    axios
      .post(url, data)
      .then((response) => {
        const data = response.data;
        if (data.error) {
          loginFailure.innerHTML = data.message;
          loginFailure.style.display = "block";
        } else {
          const user = {
            name: data.results.name,
            token: data.results.token,
          };
          const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000; // 30 days
          setItemWithExpiry("user", user, thirtyDaysInMilliseconds);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
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

const user = getItemWithExpiry("user");
if (user) {
  window.location.href = "/";
}

function setItemWithExpiry(key, value, ttl) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}
function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

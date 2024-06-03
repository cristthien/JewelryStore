const loginBtn = document.getElementById("login-account-btn");
const username = document.getElementById("user-name");
const password = document.getElementById("password");
loginBtn.addEventListener("click", async () => {
  const usernameValue = username.value;
  const passwordValue = password.value;
  const data = { email: usernameValue, password: passwordValue };

  try {
    const response = await axios.post(`${SERVER}/staff/login/`, data);

    if (response.data.error) {
      throw new Error(response.data.message);
    }
    const admin = response.data.results;
    const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000; // 30 days
    setItemWithExpiry("admin", admin, thirtyDaysInMilliseconds);
    window.location.href = "/admin";
  } catch (e) {
    alter(e.message);
  }
});

function setItemWithExpiry(key, value, ttl) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

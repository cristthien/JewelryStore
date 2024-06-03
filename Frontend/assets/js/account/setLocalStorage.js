window.onload = function () {
  const username = document.getElementById("user-name").innerText;
  const usertoken = document.getElementById("user-token").innerText;
  const value = {
    name: username,
    token: usertoken,
    method: "google",
  };
  const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000; // 30 days
  setItemWithExpiry("user", value, thirtyDaysInMilliseconds);
  window.location.href = "/";
};

function setItemWithExpiry(key, value, ttl) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

document.addEventListener("DOMContentLoaded", () => {
  const user = getItemWithExpiry("user");
  if (user.method) {
    document.getElementById("password-tab").style.display = "none";
  }
});

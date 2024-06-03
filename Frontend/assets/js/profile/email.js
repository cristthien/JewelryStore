const user = getItemWithExpiry("user");
document.addEventListener("DOMContentLoaded", () => {
  if (user.method) {
    document.getElementById("password-tab").style.display = "none";
  }
});
const changeEmailBtn = document.getElementById("change-email-btn");
const emailInput = document.getElementById("email");
changeEmailBtn.addEventListener("click", async () => {
  // changeEmail
  const email = emailInput.value;
  console.log(email);
  try {
    const response = await axios.post(
      `${SERVER}/customer/change-email`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (response.data.error) {
      throw new Error(response.data.message);
    }
    localStorage.removeItem("user");
    window.location.href = "/login";
  } catch (error) {
    console.error("There was an error!", error);
    alert(error.message);
  }
});

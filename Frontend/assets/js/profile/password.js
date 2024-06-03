document.addEventListener("DOMContentLoaded", () => {
  const user = getItemWithExpiry("user");
  const currPass = document.getElementById("currentPassword");
  const newPass = document.getElementById("newPassword");
  const confirmedNewPass = document.getElementById("confirmNewPassword");
  const changePasswordBtn = document.getElementById("save-change-password");
  if (user.method) {
    window.location.href = "/profile";
  }
  changePasswordBtn.addEventListener("click", async () => {
    if (confirmedNewPass.value === newPass.value) {
      const data = {
        oldPassword: currPass.value,
        newPassword: newPass.value,
      };
      try {
        const response = await axios.post(
          `${SERVER}/customer/change-password`,
          data,
          {
            headers: {
              Authorization: `Bearer ${
                user.value ? user.value.token : user.token
              }`,
            },
          }
        );
        if (response.data.error) {
          throw new Error(response.data.message);
        } else {
          window.location.href = "/profile";
        }
      } catch (e) {
        console.log("Error submitting customer information:", e);
        alert(e.message);
      }
    } else {
      alert("You need to input confimed password is same with new password");
    }
  });
});

function togglePasswordVisibility(inputId) {
  var passwordInput = document.getElementById(inputId);
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

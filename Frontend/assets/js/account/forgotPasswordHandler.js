const resetPasswordbtn = document.getElementById("reset-password-btn");
const emailInput = document.getElementById("user-name");

resetPasswordbtn.addEventListener("click", async () => {
  const email = emailInput.value;
  try {
    const response = await axios.post(
      `${SERVER}/customer/registerResetPassword`,
      { email }
    );

    if (response.data.error) {
      throw new Error(response.data.message);
    }
    alert("Please check out email to reset");
  } catch (error) {
    console.error("There was an error!", error);
    alert(error.message);
  }
});

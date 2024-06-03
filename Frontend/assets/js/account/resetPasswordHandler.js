const resetbtn = document.getElementById("update-password-btn");
const passwordInput = document.getElementById("password");

resetbtn.addEventListener("click", async () => {
  const password = passwordInput.value;
  const url = window.location.href;
  let data = getEmailAndToken(url);
  data.newPassword = password;
  try {
    const response = await axios.post(`${SERVER}/customer/resetPassword`, data);

    if (response.data.error) {
      throw new Error(response.data.message);
    }
    window.location.href = "/login";
  } catch (error) {
    console.error("There was an error!", error);
    alert(error.message);
  }
});

function getEmailAndToken(url) {
  let urlObj = new URL(url);

  let email = urlObj.searchParams.get("email");
  let token = urlObj.searchParams.get("token");

  return { email: email, token: token };
}

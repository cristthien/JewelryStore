document.getElementById("user-name").addEventListener("input", function () {
  var inputField = document.getElementById("user-name");
  var resetButton = document.getElementById("reset-password-btn");
  if (inputField.value.trim() === "") {
    resetButton.disabled = true;
  } else {
    resetButton.disabled = false;
  }
});

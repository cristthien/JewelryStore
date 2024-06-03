const submitBtn = document.querySelector(".admin__save-btn");
const addBtn = document.querySelector(".admin__add-stock-btn");
const imagesInput = document.getElementById("imagesInput");
document
  .querySelector(".admin__edit-btn")
  .addEventListener("click", function () {
    document.querySelectorAll("textarea").forEach(function (textarea) {
      textarea.disabled = false;
    });
    document
      .querySelectorAll('textarea, input[type="radio"]')
      .forEach(function (element) {
        element.disabled = false;
      });
    imagesInput.disabled = false;
    if (addBtn) {
      addBtn.disabled = false;
    }
    submitBtn.style.display = "block";
  });

submitBtn.addEventListener("click", function () {
  submitBtn.style.display = "none";
  document.querySelectorAll("textarea").forEach(function (textarea) {
    textarea.disabled = true;
  });
  document
    .querySelectorAll('textarea, input[type="radio"]')
    .forEach(function (element) {
      element.disabled = true;
    });
  imagesInput.disabled = true;
  if (addBtn) {
    addBtn.disabled = true;
  }
});

var plusBtns = document.querySelectorAll(".plusBtn");
var minusBtns = document.querySelectorAll(".minusBtn");

plusBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var quantitySpan = this.parentElement.querySelector(".quantity");
    quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
  });
});

minusBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    var quantitySpan = this.parentElement.querySelector(".quantity");
    quantitySpan.textContent = Math.max(
      1,
      parseInt(quantitySpan.textContent) - 1
    );
  });
});

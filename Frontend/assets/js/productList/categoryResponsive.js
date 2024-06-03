document.addEventListener("DOMContentLoaded", function () {
  var ratioHeading = document.querySelector(".mobile-menu__sort");
  var checkHeading = document.querySelector(".mobile-menu__filter");
  var sortRatio = document.querySelector(".category-sort");
  var sortCheck = document.querySelector(".category-filter");
  ratioHeading.addEventListener("click", function () {
    // Kiểm tra xem category-sort đã được hiển thị chưa
    var isDisplayed = window.getComputedStyle(sortRatio).display !== "none";
    if (!isDisplayed) {
      sortRatio.style.display = "block";
      sortCheck.style.display = "none";
    } else {
      sortRatio.style.display = "none";
    }
  });
  checkHeading.addEventListener("click", function () {
    // Kiểm tra xem category-sort đã được hiển thị chưa
    var isDisplayed = window.getComputedStyle(sortCheck).display !== "none";
    if (!isDisplayed) {
      sortCheck.style.display = "block";
      sortRatio.style.display = "none";
    } else {
      sortCheck.style.display = "none";
    }
  });
  var categoryMobile = document.querySelector(".category__mobile");
  function checkComputer() {
    var isDisplayed =
      window.getComputedStyle(categoryMobile).display !== "none";
    if (!isDisplayed) {
      sortRatio.style.display = "block";
      sortCheck.style.display = "block";
    } else {
      sortRatio.style.display = "none";
      sortCheck.style.display = "none";
    }
  }

  checkComputer(); // Kiểm tra khi trang được tải

  window.addEventListener("resize", function () {
    checkComputer(); // Kiểm tra lại khi cửa sổ được thay đổi kích thước
  });
});

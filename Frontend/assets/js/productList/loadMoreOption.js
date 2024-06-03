document.addEventListener("DOMContentLoaded", function () {
  // Thiết lập chiều cao ban đầu cho mỗi category-manager-section
  var categorySections = document.querySelectorAll(".category-manager-section");
  categorySections.forEach(function (categorySection) {
    var categoryItems = categorySection.querySelectorAll(
      ".form-check.category__holder"
    );
    var initialHeight = 0;
    for (var i = 0; i < 5 && i < categoryItems.length; i++) {
      initialHeight += categoryItems[i].offsetHeight + 16;
    }
    categorySection.style.height = initialHeight + "px";
  });

  // Lặp qua tất cả các phần tử có class là "more-category-btn" và gắn sự kiện click cho mỗi phần tử
  var moreCategoryBtns = document.querySelectorAll(".more-category-btn");
  moreCategoryBtns.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      var categorySection = this.previousElementSibling; // Lấy phần tử category-manager-section tương ứng
      var categoryItems = categorySection.querySelectorAll(
        ".form-check.category__holder"
      ); // Lấy tất cả các mục trong category

      // Tính chiều cao của 5 mục đầu tiên
      var categoryMaxHeight = 0;
      for (var i = 0; i < 5 && i < categoryItems.length; i++) {
        categoryMaxHeight += categoryItems[i].offsetHeight + 16;
      }
      console.log(categoryMaxHeight);
      console.log(categorySection.clientHeight);

      var isExtend = categorySection.clientHeight === categoryMaxHeight;
      if (isExtend) {
        categorySection.style.height = "auto";
      } else {
        categorySection.style.height = categoryMaxHeight + "px";
      }

      // Thay đổi nội dung của nút "more"
      var buttonText = this.querySelector("p");
      buttonText.textContent =
        buttonText.textContent === "More" ? "Less" : "More";
    });
  });
});

var categoryHeadings = document.querySelectorAll(".caterory__heading");
categoryHeadings.forEach(function (heading) {
  heading.addEventListener("click", function (event) {
    var categorySection = this.nextElementSibling; // Lấy phần tử category-manager-section liền sau heading
    // Đảo ngược trạng thái hiển thị của category-manager-section
    categorySection.classList.toggle("show");

    var moreBtn = this.nextElementSibling.nextElementSibling;
    // Đảo ngược trạng thái hiển thị của moreBtn
    moreBtn.classList.toggle("show");

    var angleBtn = this.querySelector(".category-btn__show-more");
    // Đảo ngược lớp của phần tử <i>
    angleBtn.classList.toggle("ti-angle-down");
    angleBtn.classList.toggle("ti-angle-up");
  });
});

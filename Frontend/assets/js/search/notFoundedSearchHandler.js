document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("main-search-btn");
  searchBtn.addEventListener("click", () => {
    const value = document.getElementById("main-search-input").value;
    window.location.href = "/search/?q=" + encodeURIComponent(value);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var productItems = document.querySelectorAll(".slide");

  productItems.forEach(function (productItem, index) {
    var carouselControlPrev = productItem.querySelector(
      ".carousel-control-prev"
    );
    var carouselControlNext = productItem.querySelector(
      ".carousel-control-next"
    );

    // Xóa bỏ id cũ (nếu có)
    productItem.removeAttribute("id");

    // Tạo id mới dựa trên index và gán cho product-item
    productItem.id = "product-item__" + (index + 1);

    // Thay đổi giá trị của data-bs-target của carousel-control-prev
    carouselControlPrev.setAttribute(
      "data-bs-target",
      "#product-item__" + (index + 1)
    );
    carouselControlNext.setAttribute(
      "data-bs-target",
      "#product-item__" + (index + 1)
    );
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".recommend-product__col");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  let currentIndex = 0;
  let visibleItems = 3; // Mặc định hiển thị 3 ảnh

  function updateVisibleItems() {
    // Kiểm tra kích thước màn hình
    if (window.innerWidth < 768) {
      visibleItems = 1; // Hiển thị chỉ 1 ảnh trên màn hình nhỏ
    } else {
      visibleItems = 3; // Hiển thị 3 ảnh trên màn hình lớn
    }
  }

  function showItems() {
    updateVisibleItems();

    // Ẩn tất cả các ảnh
    items.forEach(function (item) {
      item.style.display = "none";
    });

    // Hiển thị số lượng ảnh tương ứng
    for (
      let i = currentIndex * visibleItems;
      i < Math.min(currentIndex * visibleItems + visibleItems, items.length);
      i++
    ) {
      items[i].style.display = "block";
    }
  }

  function nextSlide() {
    if (currentIndex < Math.ceil(items.length / visibleItems) - 1) {
      currentIndex++;
      showItems();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      showItems();
    }
  }

  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  // Thêm sự kiện resize để cập nhật số lượng ảnh hiển thị khi kích thước màn hình thay đổi
  window.addEventListener("resize", showItems);

  showItems();
});

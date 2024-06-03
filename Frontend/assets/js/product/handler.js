// <!-- Js cho phần read more -->

document.querySelectorAll(".read-more").forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    var contentContainer = item.parentElement;
    var description = contentContainer.querySelector(".description");
    var contentExpanded = contentContainer.classList.contains("expanded");

    // Đảo ngược trạng thái expanded khi click
    contentContainer.classList.toggle("expanded");

    // Thay đổi nội dung của nút "Read More" tùy thuộc vào trạng thái mới của phần tử
    if (contentExpanded) {
      item.textContent = "Read More";
    } else {
      item.textContent = "Read Less";
    }
  });
});

// <!-- Js cho like button -->

document.addEventListener("DOMContentLoaded", function () {
  var likeIcon = document.querySelector(".product-detail__action");

  likeIcon.addEventListener("click", function () {
    // Lấy ra cả hai icon
    var regularIcon = this.querySelector(".fa-regular");
    var solidIcon = this.querySelector(".fa-solid");

    // Kiểm tra xem icon fa-regular có lớp 'active' không
    var isActive = regularIcon.classList.contains("active");

    // Nếu không có lớp 'active', thêm nó và ẩn icon fa-regular, hiển thị icon fa-solid
    if (!isActive) {
      regularIcon.classList.add("active");
      solidIcon.style.display = "inline-block";
      regularIcon.style.display = "none"; // Ẩn icon fa-regular
    } else {
      // Nếu có lớp 'active', loại bỏ nó và hiển thị icon fa-regular, ẩn icon fa-solid
      regularIcon.classList.remove("active");
      solidIcon.style.display = "none"; // Ẩn icon fa-solid
      regularIcon.style.display = "inline-block"; // Hiển thị icon fa-regular
    }
  });
});

// <!-- Js cho phần chuyển trang của nút discover -->

document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả các phần tử có class discover-btn
  const discoverButtons = document.querySelectorAll(".discover-btn");

  // Lặp qua từng phần tử và thêm sự kiện click
  discoverButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Chuyển hướng người dùng đến trang productDetail.html
      window.location.href = "productDetail.html";
    });
  });
});

// <!-- Js cho phần hiển thị recommend product -->

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

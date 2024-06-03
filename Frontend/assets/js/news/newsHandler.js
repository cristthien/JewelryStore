document.addEventListener("DOMContentLoaded", () => {
  const carouselInner = document.querySelector(".comment__carousel-inner");
  const prevButton = document.querySelector(".comment__carousel-button.prev");
  const nextButton = document.querySelector(".comment__carousel-button.next");
  const indicator = document.querySelector(".comment__carousel-indicator");

  const images = [
    "../assets/img/slider/slider3.jpg",
    "../assets/img/slider/slider4.jpg",
    "../assets/img/slider/slider5.jpg",
    "../assets/img/slider/slider6.jpg",
    "../assets/img/slider/slider7.jpg",
    "../assets/img/slider/slider8.jpg",
    "../assets/img/slider/slider9.jpg",
    "../assets/img/slider/slider10.jpg",
  ];

  let currentIndex = 1;

  function createCarouselItems() {
    const firstClone = document.createElement("div");
    firstClone.classList.add("comment__carousel-item");
    firstClone.innerHTML = `<img src="${images[0]}" alt="Image 1">`;

    const lastClone = document.createElement("div");
    lastClone.classList.add("comment__carousel-item");
    lastClone.innerHTML = `<img src="${images[images.length - 1]}" alt="Image ${
      images.length
    }">`;

    // Append cloned items to the beginning and end
    carouselInner.appendChild(lastClone);

    images.forEach((image, index) => {
      const item = document.createElement("div");
      item.classList.add("comment__carousel-item");
      item.innerHTML = `<img src="${image}" alt="Image ${index + 1}">`;
      carouselInner.appendChild(item);
    });

    carouselInner.appendChild(firstClone.cloneNode(true));
  }

  function updateCarousel() {
    const itemWidth = document.querySelector(
      ".comment__carousel-item"
    ).clientWidth;
    carouselInner.style.transform = `translateX(${
      -currentIndex * itemWidth
    }px)`;
    updateIndicator();
  }

  function updateIndicator() {
    const totalItems = images.length - 2;
    let currentSlide = currentIndex;
    if (currentIndex === 0) {
      currentSlide = totalItems;
    } else if (currentIndex === totalItems + 1) {
      currentSlide = 1;
    }
    indicator.textContent = `${currentSlide
      .toString()
      .padStart(2, "0")} / ${totalItems.toString().padStart(2, "0")}`;
  }

  prevButton.addEventListener("click", () => {
    if (currentIndex > 1) {
      // Kiểm tra chỉ số không được nhỏ hơn 1
      currentIndex--;
      carouselInner.style.transition = "transform 0.5s ease";
      updateCarousel();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < images.length - 2) {
      // Kiểm tra chỉ số không được lớn hơn images.length - 2
      currentIndex++;
      carouselInner.style.transition = "transform 0.5s ease";
      updateCarousel();
    }
  });

  // Khởi tạo các mục carousel
  createCarouselItems();
  // Khởi tạo carousel
  updateCarousel();
});

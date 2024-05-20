document.addEventListener("DOMContentLoaded", function() {
    // Select all carousel elements
    var carousels = document.querySelectorAll('.carousel');
  
    // Iterate over each carousel
    carousels.forEach(function(carousel, index) {
      // Generate a unique ID for each carousel
      var carouselId = 'product-item__' + (index + 1);
  
      // Assign the generated ID to the carousel
      carousel.id = carouselId;
  
      // Select the control buttons within the current carousel
      var prevButton = carousel.querySelector('.carousel-control-prev');
      var nextButton = carousel.querySelector('.carousel-control-next');
  
      // Update the data-bs-target attributes to the new ID
      prevButton.setAttribute('data-bs-target', '#' + carouselId);
      nextButton.setAttribute('data-bs-target', '#' + carouselId);
    });
  });
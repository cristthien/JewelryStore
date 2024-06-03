document.addEventListener("DOMContentLoaded", function () {
  var gridIcon = document.getElementById("gridBtn").querySelector("i");
  var feedIcon = document.getElementById("feedBtn").querySelector("i");
  var productContainers = document.querySelectorAll(".product-item-col");

  document.getElementById("gridBtn").addEventListener("click", function () {
    if (!gridIcon.classList.contains("ti-layout-grid2-alt")) {
      gridIcon.classList.remove("ti-layout-grid2");
      gridIcon.classList.add("ti-layout-grid2-alt");
      feedIcon.classList.remove("ti-layout-grid3-alt");
      feedIcon.classList.add("ti-layout-grid3");
    }
    productContainers.forEach(function (container) {
      container.classList.remove("col-md-4");
      container.classList.remove("col-sm-12");
      container.classList.add("col-md-3");
      container.classList.add("col-sm-6");
    });
  });

  document.getElementById("feedBtn").addEventListener("click", function () {
    if (!feedIcon.classList.contains("ti-layout-grid3-alt")) {
      feedIcon.classList.remove("ti-layout-grid3");
      feedIcon.classList.add("ti-layout-grid3-alt");
      gridIcon.classList.remove("ti-layout-grid2-alt");
      gridIcon.classList.add("ti-layout-grid2");
    }
    productContainers.forEach(function (container) {
      container.classList.remove("col-md-3");
      container.classList.remove("col-sm-6");
      container.classList.add("col-md-4");
      container.classList.add("col-sm-12");
    });
  });
});

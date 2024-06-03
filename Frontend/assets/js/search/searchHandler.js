document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".form-check-input");
  let value = document.getElementById("main-search").value;
  const searchBtn = document.getElementById("main-search-btn");
  searchBtn.addEventListener("click", () => {
    const currentCriteria = getCurrentCriteria();
    value = document.getElementById("main-search").value;
    const url = createURL(currentCriteria, value);
    window.location.href = url;
  });
  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      const currentCriteria = getCurrentCriteria();
      const url = createURL(currentCriteria, value);
      window.location.href = url;
    });
  });
});

function getCurrentCriteria() {
  const sortCriteria = document.querySelector(
    'input[name="optradio"]:checked'
  )?.value;
  const selectedCategories = Array.from(
    document.querySelectorAll('input[name="category"]:checked')
  ).map((input) => input.value);
  const collectionCategories = Array.from(
    document.querySelectorAll('input[name="collection"]:checked')
  ).map((input) => input.value);
  return { sortCriteria, selectedCategories, collectionCategories };
}
function createURL(criteria, searchQuery) {
  let url =
    "http://localhost:5000/search/?q=" + encodeURIComponent(searchQuery);
  if (criteria.sortCriteria) {
    url += "&sort=" + encodeURIComponent(criteria.sortCriteria);
  }
  if (criteria.selectedCategories.length > 0) {
    url +=
      "&categories=" +
      encodeURIComponent(criteria.selectedCategories.join(","));
  }
  if (criteria.collectionCategories.length > 0) {
    url +=
      "&collections=" +
      encodeURIComponent(criteria.collectionCategories.join(","));
  }
  return url;
}

document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".form-check-input");
  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      const currentCriteria = getCurrentCriteria();
      const url = createURL(currentCriteria);
      window.location.href = url;
    });
  });
});

function getCurrentCriteria() {
  const sortCriteria = document.querySelector(
    'input[name="optradio"]:checked'
  )?.value;

  let selectedCategories = Array.from(
    document.querySelectorAll('input[name="category"]:checked')
  );
  if (selectedCategories.length > 0) {
    selectedCategories = selectedCategories.map((input) => input.value);
  } else {
    selectedCategories = [];
  }

  const collectionCategories = Array.from(
    document.querySelectorAll('input[name="collection"]:checked')
  ).map((input) => input.value);
  return { sortCriteria, selectedCategories, collectionCategories };
}
function createURL(criteria) {
  let url = `${window.location.origin}${window.location.pathname}?`;
  console.log(url);
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

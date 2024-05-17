document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const productComponent = document.getElementById("products-container");

  searchInput.addEventListener("keyup", () => {
    searchButton.disabled = searchInput.value.trim() === "";
  });
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission
    let productsComponentContent = ``;
    productComponent.innerHTML = null;
    const searchTerm = searchInput.value;
    const url = "http://localhost:3000/product/search/" + searchTerm;
    fetch(url)
      .then((response) => response.json()) // Parse JSON response
      .then((data) => {
        const { length, products } = data.results;

        for (let i = 0; i < length; i++) {
          const product = products[i];
          productsComponentContent += `
            <div class="col-md-3 mt-2">
                <div class="card " >
                <img src=${product.image[0]} class="card-img-top" alt=${product.name}>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="description">${product.description}$</p>
                    <p>${product.price}$</p>
                </div>
                </div>
            </div>`;
        }

        console.log(length);
        productComponent.innerHTML = productsComponentContent;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
});

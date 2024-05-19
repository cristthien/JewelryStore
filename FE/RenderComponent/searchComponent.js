const searchSection = document.querySelector(".search-suggestion-container");
searchSection.innerHTML = "";
const totalProduct = document.querySelector(".home-filter__total-product");
const productContainer = document.querySelector(".product-container");
productContainer.innerHTML = "";

const searchForm = document.querySelectorAll(".search__area")[1];
searchForm.addEventListener("submit", async (e) => {
  productContainer.innerHTML = "";
  e.preventDefault();
  const searchText = searchForm.querySelector(".input-search-control").value;
  let productsComponentContent = ``;
  const url = "http://localhost:3000/product/search/" + searchText;
  fetch(url)
    .then((response) => response.json()) // Parse JSON response
    .then((data) => {
      const { length, products } = data.results;

      for (let i = 0; i < length; i++) {
        const product = products[i];

        productsComponentContent += `                      
        <div class="col-md-3 col-sm-6 product-item-col">
        <div class="product-item">
                  <!-- Carousel -->
          <div id="product-item__" class="carousel slide">
          
            <!-- The slideshow/carousel -->
            <div class="carousel-inner product-item__img">
            <a href="productDetail.html" class="carousel-item active">
                <img src=${product.image[0]} alt="" class="img-fluid">
              </a>
              <a href="productDetail.html" class="carousel-item">
              <img  src=${product.image[1]} alt="" class="img-fluid">
              </a>
            <a href="productDetail.html" class="carousel-item">
              <img  src=${product.image[2]} alt="" class="img-fluid">
              </a>
              <a href="productDetail.html" class="carousel-item">
                <img  src=${product.image[3]} alt="" class="img-fluid">
              </a>
            </div>
        
            <!-- Left and right controls/icons -->
          <button class="carousel-control-prev product-item__btn-direction" type="button" data-bs-target="#product-item__" data-bs-slide="prev">
            <span class="carousel-control-prev-icon product-item__btn-left-icon"></span>
          </button>
            <button class="carousel-control-next product-item__btn-direction" type="button" data-bs-target="#product-item__" data-bs-slide="next">
            <span class="carousel-control-next-icon product-item__btn-right-icon"></span>
          </button>
          </div>     
                              
          <a href="productDetail.html" class="product-item__name"> ${product.name}</a>
          <a href="productDetail.html" class="product-item__desc">Small model, quartz movement, rose gold, diamonds</a>
          <div class="product-item__price">
            <span class="product-item__low-price"></span>
            <span class="product-item__high-price">$${product.price}</span>
          </div>
          <div class="product-item__action">
            <span class="product-item__like product-item__like-liked">
              <i class="product-item__like-unfill fa-regular fa-heart"></i>
              <i class="product-item__like-fill fa-solid fa-heart"></i>
            </span>
          </div>
          <button type="button" class="btn btn-dark buy-btn">Add to bag</button>
        </div>
        </div>`;
      }
      totalProduct.innerHTML = `${length} products`;
      productContainer.innerHTML = productsComponentContent;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

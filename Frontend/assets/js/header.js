const header = document.getElementById("header");
const mobileMenu = document.getElementById("mobile-menu");

function toggleHeaderHeight() {
  var isClosed = header.clientHeight === 79;
  if (isClosed) {
    header.style.height = "auto";
    if (headerSearchSection.classList.contains("open")) {
      document.querySelector(".header-search-section").classList.remove("open");
    }
  } else {
    header.style.height = null;
  }
}
mobileMenu.addEventListener("click", toggleHeaderHeight);

const navHighJewelry = document.querySelector(".nav__high-jewelry");
const subnavHighJewelry = document.querySelector(".subnav__high-jewelry");
const navJewelry = document.querySelector(".nav__jewelry");
const subnavJewelry = document.querySelector(".subnav__jewelry");
const navAccessories = document.querySelector(".nav__accessories");
const subnavAccessories = document.querySelector(".subnav__accessories");
const slider = document.getElementById("slider");
const content = document.getElementById("content");
const footer = document.querySelector("footer");
const headerTop = document.querySelector(".header-top");
const cardHeader = document.getElementById("card__header");
const headerSearchSection = document.querySelector(".header-search-section");
const headerSearchContainer = document.querySelector(
  ".header-search-container"
);
const searchBtn = document.querySelector(".header-search-btn");
const searchSuggestionSection = document.querySelector(
  ".search-suggestion-section"
);
const searchArea = document.querySelector(".search__area");
const headerNav = document.getElementById("header-nav");
headerNav.addEventListener("click", toggleHeaderSearch);

headerSearchSection.addEventListener("click", toggleHeaderSearch);
headerSearchContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});

function toggleHeaderSearch() {
  document.querySelector(".header-search-section").classList.remove("open");
  navHighJewelry.removeEventListener("click", navHighJewelryHandler);
  navHighJewelry.addEventListener("mouseover", navHighJewelryHandler);
  navJewelry.removeEventListener("click", navJewelryHandler);
  navJewelry.addEventListener("mouseover", navJewelryHandler);
  navAccessories.removeEventListener("click", navAccessoriesHandler);
  navAccessories.addEventListener("mouseover", navAccessoriesHandler);

  // Thay icon của searchBtn
  document.querySelector(".header-search-btn").classList.remove("ti-close");
  document.querySelector(".header-search-btn").classList.add("ti-search");
  searchBtn.style.color = "black";
}

searchBtn.addEventListener("click", function (event) {
  if (!headerSearchSection.classList.contains("open")) {
    document.querySelector(".header-search-section").classList.add("open");
    navHighJewelry.removeEventListener("mouseover", navHighJewelryHandler);
    navHighJewelry.addEventListener("click", navHighJewelryHandler);
    navJewelry.removeEventListener("mouseover", navJewelryHandler);
    navJewelry.addEventListener("click", navJewelryHandler);
    navAccessories.removeEventListener("mouseover", navAccessoriesHandler);
    navAccessories.addEventListener("click", navAccessoriesHandler);
    header.style.height = null;

    // Tính toán sao cho phần search luôn nằm dưới header
    headerSearchSection.style.top = header.offsetHeight + "px";
    searchSuggestionSection.style.height =
      window.innerHeight - header.offsetHeight - searchArea.offsetHeight + "px";

    // Thay icon của searchBtn
    document.querySelector(".header-search-btn").classList.remove("ti-search");
    document.querySelector(".header-search-btn").classList.add("ti-close");
    searchBtn.style.color = "red";
  } else {
    document.querySelector(".header-search-section").classList.remove("open");
    navHighJewelry.removeEventListener("click", navHighJewelryHandler);
    navHighJewelry.addEventListener("mouseover", navHighJewelryHandler);
    navJewelry.removeEventListener("click", navJewelryHandler);
    navJewelry.addEventListener("mouseover", navJewelryHandler);
    navAccessories.removeEventListener("click", navAccessoriesHandler);
    navAccessories.addEventListener("mouseover", navAccessoriesHandler);

    // Thay icon của searchBtn
    document.querySelector(".header-search-btn").classList.remove("ti-close");
    document.querySelector(".header-search-btn").classList.add("ti-search");
    searchBtn.style.color = "black";
  }
});

window.addEventListener("resize", function () {
  headerSearchSection.style.top = header.offsetHeight + "px";
  searchSuggestionSection.style.height =
    window.innerHeight - header.offsetHeight - searchArea.offsetHeight + "px";
});

function navHighJewelryHandler(event) {
  event.preventDefault();
  toggleSubnav(subnavHighJewelry);
  toggleHeaderSearch();
}

function navJewelryHandler(event) {
  event.preventDefault();
  toggleSubnav(subnavJewelry);
  toggleHeaderSearch();
}

function navAccessoriesHandler(event) {
  event.preventDefault();
  toggleSubnav(subnavAccessories);
  toggleHeaderSearch();
}

navHighJewelry.addEventListener("mouseover", navHighJewelryHandler);
navJewelry.addEventListener("mouseover", navJewelryHandler);
navAccessories.addEventListener("mouseover", navAccessoriesHandler);

headerTop.addEventListener("mouseover", function (event) {
  hideSubnav(subnavHighJewelry);
  hideSubnav(subnavJewelry);
  hideSubnav(subnavAccessories);
});

slider.addEventListener("mouseover", function (event) {
  hideSubnav(subnavHighJewelry);
  hideSubnav(subnavJewelry);
  hideSubnav(subnavAccessories);
});
content.addEventListener("mouseover", function (event) {
  hideSubnav(subnavHighJewelry);
  hideSubnav(subnavJewelry);
  hideSubnav(subnavAccessories);
});
footer.addEventListener("mouseover", function (event) {
  hideSubnav(subnavHighJewelry);
  hideSubnav(subnavJewelry);
  hideSubnav(subnavAccessories);
});
if (cardHeader != null) {
  cardHeader.addEventListener("mouseover", function (event) {
    hideSubnav(subnavHighJewelry);
    hideSubnav(subnavJewelry);
    hideSubnav(subnavAccessories);
  });
}

function hideSubnav(subnav) {
  if (subnav.style.display === "block") {
    subnav.style.display = "none";
  }
}

function toggleSubnav(subnav) {
  const allSubnavs = document.querySelectorAll(".subnav"); // Chọn tất cả các subnav
  allSubnavs.forEach(function (item) {
    if (item !== subnav) {
      hideSubnav(item); // Ẩn tất cả các subnav trừ subnav được chọn
    }
  });

  if (subnav.style.display === "block") {
    subnav.style.display = "none";
  } else {
    subnav.style.display = "block";
  }

  navHighJewelry.removeEventListener("click", navHighJewelryHandler);
  navHighJewelry.addEventListener("mouseover", navHighJewelryHandler);
  navJewelry.removeEventListener("click", navJewelryHandler);
  navJewelry.addEventListener("mouseover", navJewelryHandler);
  navAccessories.removeEventListener("click", navAccessoriesHandler);
  navAccessories.addEventListener("mouseover", navAccessoriesHandler);
}

function viewShoppingBag() {
  // Chuyển đến trang shoppingBag.html
  window.location.href = "/cart";
}

function viewSearchFound() {
  const value = document.querySelector(".input-search-control").value;
  window.location.href = "/search/?q=" + encodeURIComponent(value);
}

document.addEventListener("DOMContentLoaded", async (event) => {
  const shoppingBag = document.querySelector(".shopping-bag__body");
  function handleUserLinkClick(event) {
    // Your condition goes here
    event.preventDefault();
    if (user) {
      window.location.href = "/profile";
    } else {
      window.location.href = "/login";
    }
  }
  // Add event listener to the link
  const userLink = document.getElementById("login-btn");
  userLink.addEventListener("click", handleUserLinkClick);

  let user = getItemWithExpiry("user");

  if (user) {
    const usernameSpan = document.getElementById("username");
    user = user.value ? user.value : user;
    const username = user.name;
    const shoppingBadge = document.querySelector(".shopping__badge");
    usernameSpan.innerHTML = username;

    try {
      // Handle call cart API with authorization
      const response = await axios.get(`${SERVER}/cart`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      let cartItemsHTML = "";
      if (response.data.results) {
        const cart = response.data.results;
        cartItemsHTML = RenderCartItem(cart.products, cart.total);
        shoppingBadge.innerHTML = cart.products.length;
      }
      shoppingBag.innerHTML = cartItemsHTML;
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  const closebtns = document.querySelectorAll(".product-item__close");
  closebtns.forEach((btn) => {
    btn.addEventListener("click", async function (event) {
      const productId = event.currentTarget.getAttribute("data-product-id");
      const response = await axios.delete(`${SERVER}/cart?id=${productId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.data.error) {
        alert(response.data.message);
      } else {
        window.location.reload();
      }
    });
  });
});

function RenderCartItem(products, total) {
  // Initialize an empty string to hold the generated HTML
  let cartItemsHTML = "";

  // Loop through each product and generate the HTML
  products.forEach((product) => {
    const productInfo = product.product;
    cartItemsHTML += `
          <div class="row shopping-bag__item">
              <div class="col-6">
                  <a href="/products/${
                    productInfo.slug
                  }" class="shopping-bag__img">
                      <img src="${productInfo.image[0]}" alt="${
      productInfo.name
    }" class="img-fluid">
                  </a>
              </div>
              <div class="col-6">
                  <div data-product-id=${
                    product._id
                  }   class="product-item__close">
                      
                      <i class="ti-close"></i>
                  </div>
                  <a href="/products/${
                    productInfo.slug
                  }" class="product-item__name-shopping-bag">
                      ${productInfo.name}
                  </a>
                  <p class="product-item__desc-shopping-bag">${
                    productInfo.description
                  }</p>

                  <div class="product-item__other-infor">

                  ${
                    product.size
                      ? `<div class="row product-item__size-shopping-bag">
                  <div class="col-6">
                    <p>Size:</p>
                  </div>
                  <div class="col-6">
                    <p>${product.size}</p>
                  </div>
                </div>`
                      : ""
                  }
                  

                  <div class="row product-item__quantity-shopping-bag">
                    <div class="col-6">
                      <p>Quantity:</p>
                    </div>
                    <div class="col-6">
                      <p>${product.quantity}</p>
                    </div>
                  </div>
                </div>

                  <div class="product-item__price-shopping-bag">
                      <span class="product-item__low-price"></span>
                      <span class="product-item__high-price">${formatCurrency(
                        productInfo.price
                      )}</span>
                  </div>
              </div>
          </div> <!-- end row-->
      `;
  });
  cartItemsHTML += ` <div class="subTotal-section" >
  <div class="row" style="margin-top: 10px;">
    <div class="col-6">
      <p class="subTotal__text">subtotal</p>
    </div>
    <div class="col-6">
      <p class="subToTal__calc">${formatCurrency(total)}</p>
    </div>
  </div>
  <p class="subTotal__message">Shipping and taxes calculated at checkout.</p>
  <div class="row justify-content-center"></div>
  <button
    type="button"
    class="btn btn-dark subTotal__btn"
    onclick="viewShoppingBag()"
  >View My Shopping Bag</button>
</div>`;

  if (products.length == 0) {
    cartItemsHTML = `<p>Shopping Bag is empty</p>`;
  }
  // Set the inner HTML of the container element with the generated HTML
  return cartItemsHTML;
}

const formSubmitButton = document.querySelector(".form-submit-btn");
if (formSubmitButton) {
  formSubmitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const emailInput = document.querySelector(".input-email-control");
      const email = emailInput.value;
      console.log(email);
      const response = await axios.get(`${SERVER}/subscriber?email=${email}`);
      if (response.data.error) {
        throw new Error(response.data.message);
      }
      alert("Subscription successful!");
      window.location.reload();
    } catch (e) {
      alert(e.message);
    }
  });
}

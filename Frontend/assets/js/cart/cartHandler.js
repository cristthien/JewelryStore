document.addEventListener("DOMContentLoaded", async () => {
  let user = getItemWithExpiry("user");
  const container = document.getElementById("shopping-bag-item__container");
  const addressItems = document.querySelectorAll(".address-item-detail");

  if (!user) {
    window.location.href = "/login";
  }

  try {
    // Handle call cart API with authorization
    const response = await axios.get(`${SERVER}/cart`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const userResponse = await axios.get(`${SERVER}/customer`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (response.data.error) {
      throw new Error(response.data.message);
    } else if (userResponse.data.error) {
      throw new Error(userResponse.data.message);
    }
    // Handle Bag
    const bag = response.data.results;
    if (bag.length == 0) {
      container.innerHTML = `
        <h3>No product in shopping bag</h3>
        `;
      return;
    }

    const subTotal = document.getElementById("main-subTotal__calc");
    const { total, products } = bag;
    let bagItemHTML = RenderBagItem(products);
    // Mount  into
    container.innerHTML = bagItemHTML;
    subTotal.innerHTML = formatCurrency(total);

    // Handle Address
    const customer = userResponse.data.results;

    addressItems[0].innerHTML = customer.deliveryName;
    addressItems[1].innerHTML = customer.phone;
    const [firstElementAddress, secondElementAddress] = splitAddress(
      customer.address
    );
    addressItems[2].innerHTML = firstElementAddress;
    addressItems[3].innerHTML = secondElementAddress;
  } catch (error) {
    alert(error.message);
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

  const orderBtn = document.getElementById("order-btn");

  orderBtn.addEventListener("click", async () => {
    const name = addressItems[0].innerHTML;
    const phone = addressItems[1].innerHTML;
    const addressOrder = `${addressItems[2].innerHTML}, ${addressItems[3].innerHTML}`;

    let data = {
      name,
      phone,
      addressOrder,
    };
    try {
      const orderReponse = await axios.post(`${SERVER}/order`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (orderReponse.data.error) {
        throw new Error(response.data.message);
      } else {
        window.location.href = "/profile/orders";
      }
    } catch (e) {
      alert(e.message);
    }
  });
});

function RenderBagItem(items) {
  let itemHTML = "";
  items.forEach((item) => {
    const productInfo = item.product;
    itemHTML += `          
    <div class="row shopping-bag__product-item">
    <div  data-product-id=${item._id} class="product-item__close">
      <i
        class="ti-close"
        style="
          float: right;
          padding: 4px;"
      ></i>
    </div>

    <div class="col-4">
      <a
        href="/products/${productInfo.slug}"
        class="shopping-bag__product-item-img"
      >
        <img
          src=${productInfo.image[0]}
          class="img-fluid"
        />
      </a>
    </div>
    <div class="col-8 my-auto">
      <div class="row">
        <div class="col-8">
          <a
            href="/products/${productInfo.slug}"
            class="shopping-bag__product-item-name"
          >
            ${productInfo.name}
          </a>
        </div>
        <div class="col-4">
          <p class="shopping-bag__product-item-price">
            ${formatCurrency(productInfo.price)}
          </p>
        </div>
      </div>
      <p class="shopping-bag__product-item-desc">${productInfo.description}</p>
      <div class="product-item__other-infor">
        ${
          item.size
            ? `        <div class="row product-item__size-shopping-bag">
            <div class="col-6">
              <p>Size:</p>
            </div>
            <div class="col-6">
              <p>${item.size}</p>
            </div>
          </div>`
            : ""
        }


        <div class="row product-item__quantity-shopping-bag">
          <div class="col-6">
            <p>Quantity:</p>
          </div>
          <div class="col-6">
            <p>${item.quantity}</p>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  });

  return itemHTML;
}

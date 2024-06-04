document.addEventListener("DOMContentLoaded", () => {
  const user = getItemWithExpiry("user");
  if (user.method) {
    document.getElementById("password-tab").style.display = "none";
  }
});
const user = getItemWithExpiry("user");

if (!user) {
  window.location.href = "/login";
} else {
  fetchData();
}

async function fetchData() {
  try {
    const response = await axios.get(`${SERVER}/customer/orders`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.message);
    }
    const results = response.data.results;
    document.addEventListener("DOMContentLoaded", mountEvent(results));
  } catch (error) {
    console.error("There was an error!", error);
    alert(error.message);
  }
}

function mountEvent(results) {
  const bag = document.getElementById("bag-container");
  bag.innerHTML = orderHTMLGenerator(results.orders);
}
function orderHTMLGenerator(orders) {
  let ordersHTML = "";
  orders.forEach((order) => {
    console.log(order);
    let itemsHTML = itemHTMLGenerator(order.items);
    ordersHTML += `         <div style="margin-left: 4px" class="row shopping-bag__product-item">
    ${itemsHTML}
    <div class="col-12" style="display: flex; justify-content: flex-end; margin-top:12px">
    <p
      class="ordered__product-item-detail"
      style="margin-right: 10px; font-weight: 600;"
    >Total amount:</p>
    <p
      class="ordered__product-item-detail"
      style="float: right;"
    >${formatCurrency(order.total)}</p>
  </div>
        
     
  </div>`;
  });
  return ordersHTML;
}

function itemHTMLGenerator(items) {
  let itemsHTML = "";
  items.forEach((item, index) => {
    itemsHTML += `          <!-- Order item section-->
   <div
     class=" col-md-4 col-sm-12 d-flex justify-content-center align-items-center"
   >
     <a href="/products/${
       item.product.slug
     }" class="shopping-bag__product-item-img">
       <img
         src="${item.product.image[0]}"
         alt=""
         class="img-fluid"
       />
     </a>
   </div>
   <div class="my-auto col-md-8 col-sm-12">
     <div class="row">
       <div class="col-8">
         <a
         href="/products/${item.product.slug}"
           class="shopping-bag__product-item-name"
         >
           ${item.product.name}
         </a>
       </div>
       <div class="col-4">
         <p class="shopping-bag__product-item-price">
         ${formatCurrency(item.product.price)}

         </p>
       </div>

       <!-- Product ordered detail -->
       ${
         item.size
           ? `<div class="col-4" style="margin-top: 10px;">
         <p class="ordered__product-item-detail">Size:</p>
       </div>
       <div class="col-8" style="margin-top: 10px;">
         <p
           class="ordered__product-item-detail"
           style="float: right;"
         >${item.size}</p>
       </div>`
           : ""
       }
       <div class="col-4">
         <p class="ordered__product-item-detail">Quantity:</p>
       </div>
       <div class="col-8">
         <p
           class="ordered__product-item-detail"
           style="float: right;"
         >${item.quantity}</p>
       </div>
     </div>
   </div>
   <!-- End Order item section-->
   `;
    if (index < items.length - 1) {
      itemsHTML += `<hr style="border: 1px solid #000; width: 100%; margin-top:12px" />`;
    }
  });
  return itemsHTML;
}

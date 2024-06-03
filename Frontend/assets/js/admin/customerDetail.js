const admin = getItemWithExpiry("admin");
const url = window.location.href;
const parts = url.split("/");
const customerID = parts[parts.length - 1];

if (!admin) {
  window.location.href = "/admin/login";
} else {
  fetchData();
}

async function fetchData() {
  try {
    const response = await axios.get(`${SERVER}/staff/customer/${customerID}`, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
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
  const customerID = document.getElementById("customer-id");
  const customerName = document.getElementById("customer-name");
  const phoneNumber = document.getElementById("phone");
  const address = document.getElementById("address");
  const orderContainer = document.getElementById("order-container");
  const email = document.getElementById("email");
  const { customer, orders } = results;
  customerID.innerHTML = customer._id;
  email.innerHTML = customer.email;
  customerName.innerHTML = customer.name;
  phoneNumber.innerHTML = customer.phone;
  address.innerHTML = customer.address;
  if (orders) {
    orderContainer.innerHTML = orderTableRender(orders);
  }
}

function orderTableRender(orders) {
  console.log(orders);
  if (orders) {
    return "";
  }
  let accHTML = "";
  orders.forEach((order) => {
    const rowProductHTML = ItemRender(order.items);

    accHTML += `
        <div class="order d-block">
          <h5>Order ID: ${order._id} </h5>
          <table class="table table-hover table-bordered">
            <thead>
              <tr>
              <th>Product name</th>
              <th> Size</th>
                <th>Quantity</th>
                <th> Price</th>
              </tr>
            </thead>
            <tbody>
            ${rowProductHTML}

            <tr>
            <td>Total</td>
            <td></td>
              <td></td>
              <td style="
    text-align: right;
">${formatCurrency(order.total)}</td>
          </tr>
            </tbody>
          </table>
  
        </div>`;
  });

  return accHTML;
}

function ItemRender(items) {
  if (items.length == 0) {
    return "";
  }
  let orderItemHTML = "";
  items.forEach((item) => {
    orderItemHTML += `<tr onclick="window.location.href = '/products/${
      item.product.slug
    }'">
    <td >${item.product.name}</td>
    <td style="
    text-align: right;
">${item.size ? item.size : ""}</td>
  <td style="
  text-align: right;
">${item.quantity}</td>
  <td style="
  text-align: right;
">${formatCurrency(item.product.price)}</td>
</tr>`;
  });
  return orderItemHTML;
}

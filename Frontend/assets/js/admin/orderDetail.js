const url = window.location.href;
const parts = url.split("/");
const orderID = parts[parts.length - 1];
const admin = getItemWithExpiry("admin");

if (!admin) {
  window.location.href = "/admin/login";
} else {
  fetchData();
}

async function fetchData() {
  try {
    const response = await axios.get(`${SERVER}/staff/orders/${orderID}`, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.message);
    }
    const order = response.data.results;
    document.addEventListener("DOMContentLoaded", mountEvent(order));
  } catch (error) {
    console.error("There was an error!", error);
    alert(error.message);
  }
}
function mountEvent(order) {
  document.getElementById("orders").className = "hovered";

  const orderID = document.getElementById("order-id");
  const customerID = document.getElementById("customer-id");
  const customerName = document.getElementById("customer-name");
  const phoneNumber = document.getElementById("phone-number");
  const address = document.getElementById("address");
  const email = document.getElementById("email");
  const orderTable = document.getElementById("order-table");
  const totalPrice = document.getElementById("total-price");

  orderID.innerHTML = order._id;
  customerID.innerHTML = order.customer._id;
  email.innerHTML = order.customer.email;
  customerName.innerHTML = order.name;
  phoneNumber.innerHTML = order.phone;
  address.innerHTML = order.address;
  orderTable.innerHTML = orderItemRender(order.items);
  totalPrice.innerHTML = formatCurrency(order.total);
}
function orderItemRender(items) {
  if (items.length == 0) {
    return "";
  }
  let orderItemHTML = "";
  items.forEach((item) => {
    orderItemHTML += `
        <tr>
        <td>${item.product.name}</td>
        <td>${item.size ? item.size : ""}</td>
        <td>${item.quantity}</td>
        <td>${formatCurrency(item.product.price)}</td>
      </tr>
        `;
  });
  return orderItemHTML;
}

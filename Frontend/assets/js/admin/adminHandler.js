document.addEventListener("DOMContentLoaded", async (req, res) => {
  document.getElementById("dashboard").className = "hovered";
  const admin = getItemWithExpiry("admin");
  const saleQuantity = document.getElementById("sale-quantity");
  const saleRevenure = document.getElementById("sale-revenue");
  const orderTable = document.getElementById("order-table");

  if (!admin) {
    window.location.href = "/admin/login";
  } else {
    try {
      const response = await axios.get(`${SERVER}/staff/orders`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });

      if (response.data.error) {
        throw new Error(response.data.message);
      }
      const orderInfo = response.data.results;
      const { orders } = orderInfo;
      const rowOrderHTML = rowOrderGenerator(orders);

      // Mount HTML
      saleQuantity.innerHTML = orderInfo.length;
      saleRevenure.innerHTML = formatCurrency(orderInfo.total);
      orderTable.innerHTML = rowOrderHTML;
    } catch (error) {
      console.error("There was an error!", error);
      alert(error.message);
    }
  }
});

function rowOrderGenerator(orders) {
  orders = orders.slice(0, 3);
  let rowsHTML = "";
  orders.forEach((order) => {
    rowsHTML += `          <tr
        onclick="window.location.href = '/admin/orders/${order._id}'"
        data-bs-toggle="popover"
        data-bs-trigger="hover"
        data-bs-html="true"
        data-bs-content="Phone number: ${order.phone}<br>Address: ${
      order.address
    }"
      >
        <td>${order._id}</td>
        <td>${order.name}</td>
        <td>${order.payment}</td>
        <td>${order.status}</td>
        <td>${formatCurrency(order.total)}</td>
      </tr>`;
  });
  return rowsHTML;
}

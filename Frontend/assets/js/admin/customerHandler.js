const admin = getItemWithExpiry("admin");

if (!admin) {
  window.location.href = "/admin/login";
} else {
  fetchData();
}

async function fetchData() {
  try {
    const response = await axios.get(`${SERVER}/staff/customer`, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.message);
    }
    const customers = response.data.results;
    document.addEventListener("DOMContentLoaded", mountEvent(customers));
  } catch (error) {
    console.error("There was an error!", error);
    alert(error.message);
  }
}
function mountEvent(customers) {
  const orderTable = document.getElementById("customer-table");
  orderTable.innerHTML = ItemRender(customers);
}
function ItemRender(items) {
  let orderItemHTML = "";
  items.forEach((item) => {
    orderItemHTML += `<tr onclick="window.location.href = '/admin/customers/${item._id}'">
    <td>${item.name}</td>
    <td>${item.email}</td>
    <td>${item.phone}</td>
    <td>${item.address}</td>
      </tr>`;
  });
  return orderItemHTML;
}

document.getElementById("orders").className = "hovered";
document.addEventListener("DOMContentLoaded", async (req, res) => {
  const admin = getItemWithExpiry("admin");
  const orderTable = document.getElementById("order-table");
  const adminSearch = document.querySelector(".admin__menu-search");

  if (!admin) {
    window.location.href = "/admin/login";
  }
  let orders = [];
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
    orders = orderInfo.orders;
    const rowOrderHTML = rowOrderGenerator(orders);

    // Mount HTML
    orderTable.innerHTML = rowOrderHTML;
  } catch (error) {
    console.error("There was an error!", error);
    alert(error.message);
  }

  adminSearch.addEventListener("input", searchOrders);

  // Search function
  function searchOrders(e) {
    const searchName = e.target.value; // Use adminSearch.value to get search input

    const results = searchName ? queryOrdersByName(orders, searchName) : orders;
    orderTable.innerHTML = "";

    if (results.length > 0) {
      orderTable.innerHTML = rowOrderGenerator(results);
    } else {
      orderTable.innerHTML = "<p>No orders found.</p>";
    }
  }
});

function queryOrdersByName(orders, name) {
  const trimmedName = name.trim().toLowerCase();
  return orders.filter((order) =>
    order.name.toLowerCase().includes(trimmedName)
  );
}
function nameHadler(event) {
  event.stopPropagation();
  const customerId = event.target.getAttribute("data-customer-id");
  window.location.href = `/customers/${customerId}`;
}

function debounce(func, delay) {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}

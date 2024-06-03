const admin = getItemWithExpiry("admin");

if (!admin) {
  window.location.href = "/admin/login";
} else {
  fetchData();
}

async function fetchData() {
  try {
    const response = await axios.get(`${SERVER}/product`, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.message);
    }
    const products = response.data.results;
    document.addEventListener("DOMContentLoaded", mountEvent(products));
  } catch (error) {
    console.error("There was an error!", error);
    alert(error.message);
  }
}
function mountEvent(products) {
  const orderTable = document.getElementById("product-table");
  const adminSearch = document.querySelector(".admin__menu-search");

  orderTable.innerHTML = ItemRender(products.data);
  let popovers = poperAnimation();
  adminSearch.addEventListener("input", search);

  // Search function
  function search(e) {
    const searchName = e.target.value; // Use adminSearch.value to get search input
    // Remove or hide all popovers
    // Hide or dispose all popov
    const results = searchName
      ? queryProductsByName(products.data, searchName)
      : products.data;
    orderTable.innerHTML = "";

    if (results.length > 0) {
      orderTable.innerHTML = ItemRender(results);
    } else {
      orderTable.innerHTML = "<p>No products found.</p>";
    }
  }
}

function queryProductsByName(products, name) {
  const trimmedName = name.trim().toLowerCase();
  return products.filter((product) =>
    product.name.toLowerCase().includes(trimmedName)
  );
}
function ItemRender(items) {
  let orderItemHTML = "";
  items.forEach((item) => {
    let sizeStockAttribure = "";

    if (item.sizes && item.sizes.length > 0) {
      const sizes = item.sizes;
      sizeStockAttribure = sizes.reduce((acc, size) => {
        acc += `Size: ${size.size} | Stock: ${size.stock}<br>`;
        return acc;
      }, "");
    } else {
      sizeStockAttribure = `Stock: ${item.stock}`;
    }

    orderItemHTML += `          
    <tr
    onclick="window.location.href = '/admin/products/${item._id}'"
    data-bs-toggle="popover"
    data-bs-trigger="hover"
    data-bs-html="true"  
    data-bs-content="${sizeStockAttribure}">
    <td>${item.name}</td>
    <td>${item.description}</td>
    <td>${formatCurrency(item.price)}</td>
  </tr>`;
  });
  return orderItemHTML;
}

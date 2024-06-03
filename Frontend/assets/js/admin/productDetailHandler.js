const url = window.location.href;
const parts = url.split("/");
const productID = parts[parts.length - 1];
const admin = getItemWithExpiry("admin");
const btnAddStock = document.querySelector(".admin__add-stock-btn");

if (!admin) {
  window.location.href = "/admin/login";
} else {
  fetchData();
}

async function fetchData() {
  try {
    const response = await axios.get(`${SERVER}/staff/products/${productID}`, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.message);
    }
    const product = response.data.results;
    document.addEventListener("DOMContentLoaded", mountEvent(product));
  } catch (error) {
    console.error("There was an error!", error);
    alert(error.message);
  }
}
function mountEvent(product) {
  const { name, price, description, image, stock, sizes } = product;
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const descriptionInput = document.getElementById("description");
  const nonSizeRadio = document.getElementById("nonSizeRadio");
  const sizeRadio = document.getElementById("sizeRadio");
  const stockSection = document.getElementById("stockSection");
  const saveBtn = document.querySelector(".admin__save-btn");
  stockSection.innerHTML = "";
  const editBtn = document.querySelector(".admin__edit-btn");

  renderImage(image);
  nameInput.value = name;
  priceInput.value = price;
  descriptionInput.value = description;
  if (stock) {
    nonSizeRadio.checked = true;

    // Hide the add stock button
    btnAddStock.style.display = "none";

    // Create a new stock item div
    const newStockItem = document.createElement("div");
    newStockItem.className = "col-6 admin__product-manage-stock-item";

    // Set the inner HTML structure for the new stock item
    newStockItem.innerHTML = `
      <div class="wrapper wrapper-custom">
        <h2>Stock</h2>
        <textarea id="none-size-input" disabled placeholder="Stock..." required></textarea>
      </div>
    `;

    // Append the new stock item to the stock section
    stockSection.appendChild(newStockItem);

    // Set the value of the textarea
    const textarea = newStockItem.querySelector("#none-size-input");
    textarea.value = stock; // Replace "stock" with the actual stock value you want to set
  } else {
    sizeRadio.checked = true;
    sizes.forEach((item) => {
      const newStockItem = document.createElement("div");
      newStockItem.className = "col-6 admin__product-manage-stock-item";

      // Create the HTML structure
      newStockItem.innerHTML = `
          <div class="wrapper wrapper-custom">
            <h2>Stock</h2>
            <textarea class="stock-input" disabled placeholder="Stock..." required></textarea>
          </div>
          <div class="wrapper wrapper-custom">
            <h2>Size</h2>
            <textarea class="size-input" disabled placeholder="Size..." required></textarea>
          </div>
        `;

      // Append the newStockItem to the stockSection
      stockSection.appendChild(newStockItem);

      // Set the values of the textareas
      newStockItem.querySelector(".stock-input").value = item.stock;
      newStockItem.querySelector(".size-input").value = item.size;
    });
  }
  editBtn.addEventListener("click", () => {
    if (stock) {
      sizeRadio.disabled = true;
    } else {
      nonSizeRadio.disabled = true;
    }
  });
  saveBtn.addEventListener("click", () => {
    const formData = new FormData();
    const selectedButton = getSelectedRadioButton();
    const typeProduct = selectedButton.id;
    const images = document.getElementById("imagesInput");
    const nameValue = nameInput.value;
    const priceValue = priceInput.value;
    const descriptionValue = descriptionInput.value;

    formData.append("name", nameValue);
    formData.append("price", priceValue);
    formData.append("description", descriptionValue);

    for (let i = 0; i < 12 && images.files[i]; i++) {
      formData.append("images", images.files[i]);
    }
    if (typeProduct == "nonSizeRadio") {
      const input = document.getElementById("none-size-input");
      formData.append("stock", input.value);
    } else {
      let sizes = [];
      let stockInput = document.querySelectorAll(".stock-input");
      let sizeInput = document.querySelectorAll(".size-input");
      const inputLength = sizeInput.length;
      for (let i = 0; i < inputLength; i++) {
        const stockValue = stockInput[i].value;
        const sizeValue = sizeInput[i].value;
        sizes.push({ size: sizeValue, stock: stockValue });
      }
      formData.append("sizes", JSON.stringify(sizes));
    }
    axios
      .post(`${SERVER}/product/${product._id}`, formData, {
        headers: {
          Authorization: "Bearer ${admin.token}",
        },
      })
      .then((response) => {
        window.location.href = `/admin/products/${response.data.results._id}`;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

function renderImage(images) {
  const imageContainer = document.getElementById("img-container");
  images.forEach((image, index) => {
    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.className = "img-fluid displayImage";
    imgElement.alt = `Image ${index + 1}`;

    const colDiv = document.createElement("div");

    colDiv.className = index === 0 ? "col-12" : "col-6";
    colDiv.style.marginTop = index === 0 ? "0" : "10px";
    colDiv.appendChild(imgElement);

    imageContainer.appendChild(colDiv);
  });
}
function getSelectedRadioButton() {
  const radios = document.querySelectorAll("input[name='optradio']");
  for (const radio of radios) {
    if (radio.checked) {
      return radio;
    }
  }
  return null;
}

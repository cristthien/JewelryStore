const name = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("description");
const images = document.getElementById("imagesInput");
const submitBtn = document.getElementById("submit");
const admin = getItemWithExpiry("admin");
if (!admin) {
  window.location.href = "/admin/login";
}
submitBtn.addEventListener("click", (e) => {
  const selectedButton = getSelectedRadioButton();
  const typeProduct = selectedButton.id;
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("price", price.value);
  formData.append("images", images.files);
  formData.append("description", description.value);
  for (let i = 0; i < 12; i++) {
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
  // Assume formData is your FormData object

  axios
    .post(`${SERVER}/product`, formData, {
      headers: {
        Authorization: "Bearer ${admin.token}",
      },
    })
    .then((response) => {
      console.log(response.data);
      window.location.href = `/admin/products/${response.data.results._id}`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
function getSelectedRadioButton() {
  const radios = document.querySelectorAll("input[name='optradio']");
  for (const radio of radios) {
    if (radio.checked) {
      return radio;
    }
  }
  return null;
}

document.addEventListener("DOMContentLoaded", async () => {
  const addressSaveBtn = document.getElementById("save-address-btn");
  const address = document.getElementById("address");
  const addressDetail = document.getElementById("address-detail");
  const username = document.getElementById("user-name");
  const phone = document.getElementById("phone-number");

  const user = getItemWithExpiry("user");
  if (!user) {
    window.location.href = "/login";
  }
  console.log(user.token);
  const addressItems = document.querySelectorAll(".address-item-detail");

  try {
    const response = await axios.get(`${SERVER}/customer`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (response.data.error) {
      throw new Error(response.data.message);
    }
    const customer = response.data.results;

    addressItems[0].innerHTML = customer.deliveryName
      ? customer.deliveryName
      : "";
    addressItems[1].innerHTML = customer.phone;
    const [firstElementAddress, secondElementAddress] = splitAddress(
      customer.address
    );
    addressItems[2].innerHTML = firstElementAddress;
    addressItems[3].innerHTML = secondElementAddress;
  } catch (e) {
    alert(e.message);
  }

  // Hand Change Address
  addressSaveBtn.addEventListener("click", async () => {
    // Get the values from the input fields
    const phoneValue = phone.value.trim();
    const usernameValue = username.value.trim();
    const addressValue = address.value.trim();
    const addressDetailValue = addressDetail.value.trim();

    // Check if any of the fields are empty
    if (!phoneValue || !usernameValue || !addressValue || !addressDetailValue) {
      alert("Please fill in all fields.");
      return;
    }

    // If all fields are filled, proceed to call the API
    const data = {
      phone: phoneValue,
      deliveryName: usernameValue,
      address: `${addressDetailValue}, ${addressValue}`,
    };

    try {
      const response = await axios.post(`${SERVER}/customer`, data, {
        headers: {
          Authorization: `Bearer ${user.value ? user.value.token : user.token}`,
        },
      });

      if (response.data.error) {
        throw new Error(response.data.message);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("There was an error!", error);
      alert(error.message);
    }
  });
});

function splitAddress(address) {
  if (!address) {
    return [null, null];
  }
  const parts = address.split(", ");
  const firstPart = parts[0];
  const secondPart = parts.slice(1).join(", ");
  return [firstPart, secondPart];
}

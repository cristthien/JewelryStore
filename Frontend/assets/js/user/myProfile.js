document.addEventListener("DOMContentLoaded", async function () {
  const saveProfile = document.getElementById("save-profile");
  const logOutButton = document.getElementById("log-out-btn");
  const profileInputs = document.querySelectorAll(".profile__input");
  const emailInput = document.querySelector(".profile__input-email");
  const radioButtons = document.querySelectorAll('input[name="optradio"]');
  const daySelect = document.getElementById("day");
  const monthSelect = document.getElementById("month");
  const yearSelect = document.getElementById("year");
  const user = getItemWithExpiry("user");
  if (!user) {
    window.location.href = "/login";
  }
  const response = await axios.get(`${SERVER}/customer`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  if (response.data.error) {
    alert(response.data.message);
    return;
  }
  const customer = response.data.results;

  emailInput.value = customer.email;
  profileInputs[0].value = customer.name;
  profileInputs[1].value = customer.phone;

  const dob = new Date(customer.dob); // Parse dob as a Date object

  // Set the day, month, and year select elements with the parsed dob values
  daySelect.value = dob.getDate();
  monthSelect.value = dob.getMonth() + 1; // Months are 0-indexed in JavaScript
  yearSelect.value = dob.getFullYear();

  radioButtons.forEach((radio) => {
    if (radio.value === customer.gender) {
      radio.checked = true;
      radio.disabled = false;
    } else {
      radio.disabled = true;
    }
  });

  // Event handler
  logOutButton.addEventListener("click", logout);
  saveProfile.addEventListener("click", async () => {
    let selectedGender;
    let values = {};
    const user = getItemWithExpiry("user");

    radioButtons.forEach((radio) => {
      if (radio.checked) {
        selectedGender = radio.value;
      }
    });
    console.log("gender", selectedGender);

    const selectedDay =
      daySelect.options[daySelect.selectedIndex]?.value || "Not Selected";
    const selectedMonth =
      monthSelect.options[monthSelect.selectedIndex]?.value || "Not Selected";
    const selectedYear =
      yearSelect.options[yearSelect.selectedIndex]?.value || "Not Selected";
    console.log("Date of Birth:", selectedDay, selectedMonth, selectedYear);

    profileInputs.forEach((input) => {
      values[input.name] = input.value;
    });
    let data = {
      name: values.username,
      phone: values.phone,
      gender: selectedGender,
    };

    if (selectedDay && selectedMonth && selectedYear) {
      const day = parseInt(selectedDay, 10);
      const month = parseInt(selectedMonth, 10);
      const year = parseInt(selectedYear, 10);
      data.day = day;
      data.month = month;
      data.year = year;
    }

    if (!user) {
      window.location.href = "/login";
    }
    try {
      const response = await axios.post(`${SERVER}/customer`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.data.error) {
        alert(response.data.message);
      } else {
        let newuser = JSON.parse(localStorage.getItem("user"));

        newuser.value.name = values.username;
        localStorage.removeItem("user"); // Remove the existing user object
        localStorage.setItem("user", JSON.stringify(newuser)); // Save the updated user object
        window.location.reload();
      }
    } catch (error) {
      console.log("Error submitting customer information:", error);
      alert(error.message);
    }
  });
});

function logout() {
  // remove the local store with name user
  localStorage.removeItem("user");
  // Redirect to the home page
  window.location.href = "/"; // Update the URL if needed
}

// Utils
function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
document.addEventListener("DOMContentLoaded", () => {
  const user = getItemWithExpiry("user");
  if (user.method) {
    document.getElementById("password-tab").style.display = "none";
  }
});

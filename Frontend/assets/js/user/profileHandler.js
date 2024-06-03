// Function to populate days based on selected month and year
function populateDays() {
  var month = parseInt(document.getElementById("month").value, 10);
  var year = parseInt(document.getElementById("year").value, 10);
  var daySelect = document.getElementById("day");
  var daysInMonth = 31; // Default to 31 days

  if (month === 4 || month === 6 || month === 9 || month === 11) {
    daysInMonth = 30;
  } else if (month === 2) {
    // February
    daysInMonth =
      year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28; // Leap year check
  }

  // Clear existing options
  daySelect.innerHTML = "";

  // Populate day options
  for (var i = 1; i <= daysInMonth; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }
}

// Initialize dropdowns with current date
var currentDate = new Date();
var daySelect = document.getElementById("day");
var monthSelect = document.getElementById("month");
var yearSelect = document.getElementById("year");

// Populate years dropdown
for (let year = 1910; year <= currentDate.getFullYear(); year++) {
  let option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
}

// Add event listeners to month and year dropdowns
monthSelect.addEventListener("change", populateDays);
yearSelect.addEventListener("change", populateDays);

// Populate days based on the current month and year
populateDays();

document
  .getElementById("edit-profile-btn")
  .addEventListener("click", function () {
    // Enable the input fields
    document.querySelectorAll(".profile__input").forEach(function (input) {
      input.disabled = false;
    });
    // Enable the input fields
    document.querySelectorAll(".profile__input").forEach(function (input) {
      input.disabled = false;
    });

    // Enable the gender radio buttons
    document.querySelectorAll(".form-check-input").forEach(function (input) {
      input.disabled = false;
    });

    // Enable the date of birth selects
    document.querySelectorAll(".profile__dob").forEach(function (select) {
      select.disabled = false;
    });

    // Show the save button
    document.getElementById("save-profile").style.display = "block";
  });

document.getElementById("save-profile").addEventListener("click", function () {
  // Disable the input fields
  document.querySelectorAll(".profile__input").forEach(function (input) {
    input.disabled = true;
  });

  // Disable the gender radio buttons
  document.querySelectorAll(".form-check-input").forEach(function (input) {
    input.disabled = true;
  });

  // Disable the date of birth selects
  document.querySelectorAll(".profile__dob").forEach(function (select) {
    select.disabled = true;
  });

  // Hide the save button
  this.style.display = "none";
});

const hoveredElement = document.getElementById(checkUrlForKeywords());
const main = document.querySelector(".admin__menu-main");

// add hovered class to selected list item
let list = document.querySelectorAll(".admin__menu-navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

main.addEventListener("mouseover", function () {
  list.forEach((item) => {
    if (item !== hoveredElement) {
      item.classList.remove("hovered");
    }
  });
  hoveredElement.classList.add("hovered");
});

// Menu Toggle
const toggle = document.querySelector(".admin__menu-toggle");
const navigation = document.querySelector(".admin__menu-navigation");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

function checkUrlForKeywords() {
  const url = window.location.href;

  if (url.includes("orders")) {
    return "orders";
  } else if (url.includes("products")) {
    return "products";
  } else if (url.includes("customers")) {
    return "customers";
  } else if (url.includes("password")) {
    return "password";
  } else {
    return "dashboard";
  }
}

const signOutBtn = document.getElementById("sign-out");
signOutBtn.addEventListener("click", () => {
  // Remove the item with key 'admin' from localStorage
  localStorage.removeItem("admin");

  // Optionally, redirect to the login page or perform other sign-out related actions
  window.location.href = "/admin/login"; // Redirect to the login page
});

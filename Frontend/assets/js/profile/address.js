const addNewAddressBtn = document.querySelector(".my-address__btn-add");
const updateAddressBtn = document.querySelector(".address-item__btn-update");
const modal = document.querySelector(".js-modal");
const modalClose = document.querySelector(".js-modal-close");
const modalContainer = document.querySelector(".js-modal-container");

function showBuyTickets() {
  modal.classList.add("open");
}

function hideBuyTickets() {
  modal.classList.remove("open");
}

updateAddressBtn.addEventListener("click", showBuyTickets);

modalClose.addEventListener("click", hideBuyTickets);

modal.addEventListener("click", hideBuyTickets);

modalContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});

document.addEventListener("DOMContentLoaded", () => {
  const user = getItemWithExpiry("user");
  if (user.method) {
    document.getElementById("password-tab").style.display = "none";
  }
});

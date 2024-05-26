const hoveredElement = document.querySelector(".admin__menu-navigation li.hovered");
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

main.addEventListener("mouseover", function() {
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
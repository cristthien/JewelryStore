var header = document.getElementById('header');
var mobileMenu = document.getElementById('mobile-menu');
// var headerHeight = header.clientHeight;
mobileMenu.onclick = function(){
  var isClosed = header.clientHeight === 79;
  if (isClosed) {
    header.style.height = 'auto';
  }
  else {
    header.style.height = null;
  }
}
const navHighJewelry = document.querySelector('.nav__high-jewelry');
const subnavHighJewelry = document.querySelector('.subnav__high-jewelry');
const navJewelry = document.querySelector('.nav__jewelry');
const subnavJewelry = document.querySelector('.subnav__jewelry');
const navAccessories = document.querySelector('.nav__accessories');
const subnavAccessories = document.querySelector('.subnav__accessories');
const slider = document.getElementById("slider");
const content = document.getElementById("content");
const footer = document.querySelector('footer');
const headerTop = document.querySelector('.header-top');
const cardHeader = document.getElementById("card__header");

    navHighJewelry.addEventListener('mouseover', function(event) {
      event.preventDefault();
      toggleSubnav(subnavHighJewelry); // Hiển thị subnav khi di chuột vào nút nav
    });

    navJewelry.addEventListener('mouseover', function(event) {
      event.preventDefault();
      toggleSubnav(subnavJewelry); // Hiển thị subnav khi di chuột vào nút nav
    });

    navAccessories.addEventListener('mouseover', function(event) {
      event.preventDefault();
      toggleSubnav(subnavAccessories); // Hiển thị subnav khi di chuột vào nút nav
    });

    headerTop.addEventListener('mouseover', function(event) {
      hideSubnav(subnavHighJewelry);
      hideSubnav(subnavJewelry);
      hideSubnav(subnavAccessories);
    });
    slider.addEventListener('mouseover', function(event) {
        hideSubnav(subnavHighJewelry);
        hideSubnav(subnavJewelry);
        hideSubnav(subnavAccessories);
    });
    content.addEventListener('mouseover', function(event) {
      hideSubnav(subnavHighJewelry);
      hideSubnav(subnavJewelry);
      hideSubnav(subnavAccessories);
    });
    footer.addEventListener('mouseover', function(event) {
      hideSubnav(subnavHighJewelry);
      hideSubnav(subnavJewelry);
      hideSubnav(subnavAccessories);
    });
    cardHeader.addEventListener('mouseover', function(event) {
      hideSubnav(subnavHighJewelry);
      hideSubnav(subnavJewelry);
      hideSubnav(subnavAccessories);
    });

    function hideSubnav(subnav) {
        if (subnav.style.display === 'block') {
            subnav.style.display = 'none';
        }
    }

    function toggleSubnav(subnav) {
      const allSubnavs = document.querySelectorAll('.subnav'); // Chọn tất cả các subnav
      allSubnavs.forEach(function(item) {
          if (item !== subnav) {
              hideSubnav(item); // Ẩn tất cả các subnav trừ subnav được chọn
          }
      });

        if (subnav.style.display === 'block') {
            subnav.style.display = 'none';
        } else {
            subnav.style.display = 'block';
        }
    }

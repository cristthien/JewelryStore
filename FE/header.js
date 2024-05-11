const header = document.getElementById('header');
const mobileMenu = document.getElementById('mobile-menu');

function toggleHeaderHeight() {
  var isClosed = header.clientHeight === 79;
  if (isClosed) {
    header.style.height = 'auto';
    if (headerSearchSection.classList.contains('open')) {
      document.querySelector('.header-search-section').classList.remove('open');
    }
  } else {
    header.style.height = null;
  }
};
mobileMenu.addEventListener('click', toggleHeaderHeight);

const navHighJewelry = document.querySelector('.nav__high-jewelry');
const subnavHighJewelry = document.querySelector('.subnav__high-jewelry');
const navJewelry = document.querySelector('.nav__jewelry');
const subnavJewelry = document.querySelector('.subnav__jewelry');
const navAccessories = document.querySelector('.nav__accessories');
const subnavAccessories = document.querySelector('.subnav__accessories');
const slider = document.getElementById('slider');
const content = document.getElementById('content');
const footer = document.querySelector('footer');
const headerTop = document.querySelector('.header-top');
const cardHeader = document.getElementById('card__header');
const headerSearchSection = document.querySelector('.header-search-section');
const headerSearchContainer = document.querySelector('.header-search-container');

headerSearchSection.addEventListener('click',toggleHeaderSearch)
headerSearchContainer.addEventListener('click', function(event){
  event.stopPropagation()
})

const searchBtn = document.querySelector('.header-search-btn');

function toggleHeaderSearch(){
    document.querySelector('.header-search-section').classList.remove('open');
    navHighJewelry.removeEventListener('click', navHighJewelryHandler);
    navHighJewelry.addEventListener('mouseover', navHighJewelryHandler);
    navJewelry.removeEventListener('click', navJewelryHandler);
    navJewelry.addEventListener('mouseover', navJewelryHandler);
    navAccessories.removeEventListener('click', navAccessoriesHandler);
    navAccessories.addEventListener('mouseover', navAccessoriesHandler);
}

searchBtn.addEventListener('click', function(event){
  if (!headerSearchSection.classList.contains('open')) {
      document.querySelector('.header-search-section').classList.add('open');
      navHighJewelry.removeEventListener('mouseover', navHighJewelryHandler);
      navHighJewelry.addEventListener('click', navHighJewelryHandler);
      navJewelry.removeEventListener('mouseover', navJewelryHandler);
      navJewelry.addEventListener('click', navJewelryHandler);
      navAccessories.removeEventListener('mouseover', navAccessoriesHandler);
      navAccessories.addEventListener('click', navAccessoriesHandler);
      header.style.height = null;
  }
  else {
      document.querySelector('.header-search-section').classList.remove('open');
  }
});

    function navHighJewelryHandler(event) {
     event.preventDefault();
      toggleSubnav(subnavHighJewelry);
      toggleHeaderSearch();
    }

    function navJewelryHandler(event) {
      event.preventDefault();
       toggleSubnav(subnavJewelry);
       toggleHeaderSearch();
     }

     function navAccessoriesHandler(event) {
      event.preventDefault();
       toggleSubnav(subnavAccessories);
       toggleHeaderSearch();
     }

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

        navHighJewelry.removeEventListener('click', navHighJewelryHandler);
        navHighJewelry.addEventListener('mouseover', navHighJewelryHandler);
        navJewelry.removeEventListener('click', navJewelryHandler);
        navJewelry.addEventListener('mouseover', navJewelryHandler);
        navAccessories.removeEventListener('click', navAccessoriesHandler);
        navAccessories.addEventListener('mouseover', navAccessoriesHandler);
    }
    
    function viewShoppingBag() {
      // Chuyển đến trang shoppingBag.html
      window.location.href = 'shoppingBag.html';
    }


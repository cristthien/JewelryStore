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
const searchBtn = document.querySelector('.header-search-btn');
const searchSuggestionSection = document.querySelector('.search-suggestion-section');
const searchArea = document.querySelector('.search__area');

headerSearchSection.addEventListener('click',toggleHeaderSearch)
headerSearchContainer.addEventListener('click', function(event){
  event.stopPropagation()
})

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

      // Tính toán sao cho phần search luôn nằm dưới header
      headerSearchSection.style.top = header.offsetHeight + 'px';
      searchSuggestionSection.style.height = window.innerHeight - header.offsetHeight - searchArea.offsetHeight + 'px';

      // Thay icon của searchBtn
      document.querySelector('.header-search-btn').classList.remove('ti-search');
      document.querySelector('.header-search-btn').classList.add('ti-close');
      searchBtn.style.color = 'red';
  }
  else {
      document.querySelector('.header-search-section').classList.remove('open');
      navHighJewelry.removeEventListener('click', navHighJewelryHandler);
      navHighJewelry.addEventListener('mouseover', navHighJewelryHandler);
      navJewelry.removeEventListener('click', navJewelryHandler);
      navJewelry.addEventListener('mouseover', navJewelryHandler);
      navAccessories.removeEventListener('click', navAccessoriesHandler);
      navAccessories.addEventListener('mouseover', navAccessoriesHandler);

      // Thay icon của searchBtn
      document.querySelector('.header-search-btn').classList.remove('ti-close');
      document.querySelector('.header-search-btn').classList.add('ti-search');
      searchBtn.style.color = 'black';
  }
});

window.addEventListener('resize', function() {
  headerSearchSection.style.top = header.offsetHeight + 'px';
  searchSuggestionSection.style.height = window.innerHeight - header.offsetHeight - searchArea.offsetHeight + 'px';
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

     navHighJewelry.addEventListener('mouseover', navHighJewelryHandler);
     navJewelry.addEventListener('mouseover', navJewelryHandler);
     navAccessories.addEventListener('mouseover', navAccessoriesHandler);

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




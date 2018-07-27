var buttonMenu = document.querySelector('.js-menu-button');
var menu = document.querySelector('.header-menu');

buttonMenu.addEventListener('click', function () {
  menu.classList.toggle('header-menu--opened');
});

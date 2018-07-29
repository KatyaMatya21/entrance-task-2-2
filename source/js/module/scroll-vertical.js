var scrollContainer = document.querySelector('.status__right');
var scrollStatus = document.querySelector('.status__scroll');

scrollContainer.addEventListener('scroll', function () {
  if (this.scrollTop === this.scrollHeight - this.offsetHeight) {
    scrollStatus.classList.remove('status__scroll--active');
  } else {
    scrollStatus.classList.add('status__scroll--active');
  }
});

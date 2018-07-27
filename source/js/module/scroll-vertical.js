var scrollContainer = document.querySelector('.status__right');
var scrollStatus = document.querySelector('.status__scroll');

scrollContainer.addEventListener('scroll', function () {
  if (this.scrollTop === this.scrollHeight - this.offsetHeight) {
    scrollStatus.style.display = 'none';
  } else {
    scrollStatus.style.display = 'block';
  }
});

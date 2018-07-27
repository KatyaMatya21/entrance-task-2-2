var filters = document.querySelector('.device__filters');
var filterList = filters.querySelectorAll('.filter__item');

var toggleFilterList = function () {
  filters.classList.toggle('device__filters--closed');
};

filterList.forEach(function (item) {
  item.addEventListener('click', function () {
    if (this.classList.contains('filter__item--active')) {
      return;
    }

    var currentActiveFilter = filters.querySelector('.filter__item--active');
    currentActiveFilter.classList.remove('filter__item--active');
    currentActiveFilter.removeEventListener('click', toggleFilterList);

    this.classList.add('filter__item--active');
    this.addEventListener('click', toggleFilterList);

    filters.classList.add('device__filters--closed');
  });
});

filters.querySelector('.filter__item--active').addEventListener('click', toggleFilterList);

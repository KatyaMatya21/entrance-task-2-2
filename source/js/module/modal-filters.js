var modalFilters = document.querySelectorAll('.modal__filter');

modalFilters.forEach(function (list) {
  var modalFilterList = list.querySelectorAll('.filter__item');

  modalFilterList.forEach(function (item) {
    item.addEventListener('click', function () {
      if (this.classList.contains('filter__item--active')) {
        return;
      }

      list.querySelector('.filter__item--active').classList.remove('filter__item--active');
      this.classList.add('filter__item--active');
    });
  });
});

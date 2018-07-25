var buttons = document.querySelectorAll('[data-type]');

buttons.forEach(function (item) {
  item.addEventListener("click", function () {
    var typeModal = this.dataset.modal;
    var modal = document.querySelector('[data-modal-type=' + typeModal + ']');
    modal.classList.add('modal--opened');
  });
});

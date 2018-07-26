(function(){

  /**
   * Modal controller
   * @constructor
   */
  function ModalsController() {
    this._activeModal = null;
    this._closeListener = null;
    this.init();
  }

  /**
   * Initialization, button click handler to open modals
   */
  ModalsController.prototype.init = function() {
    var buttons = document.querySelectorAll('[data-type]');
    var self = this;
    buttons.forEach(function (item) {
      item.addEventListener("click", self.onModalButtonClick.bind(self));
    });
  };

  /**
   *  Opens modal, button click handler to close modal
   */
  ModalsController.prototype.onModalButtonClick = function(event) {
    var typeModal = event.currentTarget.dataset.modal;
    this._activeModal = this.findModal(typeModal);
    this._activeModal.classList.add('modal--opened');
    document.querySelector('.wrap').classList.add('wrap--blur');
    this._closeListener = this.onModalCloseClick.bind(this);
    this._activeModal.querySelector('.js-close').addEventListener('click', this._closeListener);
  };

  /**
   * Closes modal, removes button handler closing modal
   */
  ModalsController.prototype.onModalCloseClick = function() {
    this._activeModal.querySelector('.js-close').removeEventListener('click', this._closeListener);
    this._activeModal.classList.remove('modal--opened');
    document.querySelector('.wrap').classList.remove('wrap--blur');
    this._activeModal = null;
    this._closeListener = null;
  };

  /**
   * Finds current modal
   * @param typeModal
   * @returns {Element}
   */
  ModalsController.prototype.findModal = function(typeModal) {
    return document.querySelector('[data-modal-type=' + typeModal + ']');
  };

  window.ModalsController = ModalsController;

}());

new window.ModalsController();

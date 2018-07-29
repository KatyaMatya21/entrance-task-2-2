(function () {

  /**
   * Slider controller
   * @param element
   * @param controls
   * @constructor
   */
  function SliderController(element, controls) {
    this._element = element;
    this._controls = controls;
    this._button = null;
    this._isMouseDown = false;
    this.init();
  }

  /**
   * Initialization
   */
  SliderController.prototype.init = function () {
    this._button = this._element.querySelector('.lamp__button');

    this._button.addEventListener('mousedown', this.OnMouseDown.bind(this));
    this._button.addEventListener('touchstart', this.OnMouseDown.bind(this));

    window.addEventListener('mousemove', this.OnMouseMove.bind(this));
    window.addEventListener('touchmove', this.OnTouchMove.bind(this), {passive: false});

    window.addEventListener('mouseup', this.OnMouseUp.bind(this));
    window.addEventListener('touchend', this.OnMouseUp.bind(this));

    var presets = this._controls.querySelectorAll('.filter__item');
    var self = this;

    presets.forEach(function (item) {
      item.addEventListener('click', self.onPresetSelected.bind(self));
    });
  };

  /**
   * Preset click handler
   * @param event
   */
  SliderController.prototype.onPresetSelected = function (event) {
    if (event.target.classList.contains('filter__item--active')) {
      return;
    }

    this._controls.querySelector('.filter__item--active').classList.remove('filter__item--active');
    event.target.classList.add('filter__item--active');
    this.setSliderValue(event.target.dataset.preset);
  };

  /**
   * Set slider value
   * @param value
   */
  SliderController.prototype.setSliderValue = function (value) {

    if (this.isMobile()) {
      var valuePX = this._element.offsetHeight - (this._element.offsetHeight / 100 * value);

      if (
        (valuePX > this._button.offsetHeight / 2) ||
        (valuePX < this._element.offsetHeight - this._button.offsetHeight / 2)
      ) {
        valuePX -= this._button.offsetHeight / 2;
      }

      if (valuePX < 0) {
        valuePX = 0;
      }

      if (valuePX > this._element.offsetHeight - this._button.offsetHeight) {
        valuePX = this._element.offsetHeight - this._button.offsetHeight;
      }

      this._button.style.top = valuePX + 'px';

    } else {

      var valuePX = this._element.offsetWidth / 100 * value;

      if (
        (valuePX > this._button.offsetWidth / 2) ||
        (valuePX < this._element.offsetWidth - this._button.offsetWidth / 2)
      ) {
        valuePX -= this._button.offsetWidth / 2;
      }

      if (valuePX < 0) {
        valuePX = 0;
      }

      if (valuePX > this._element.offsetWidth - this._button.offsetWidth) {
        valuePX = this._element.offsetWidth - this._button.offsetWidth;
      }

      this._button.style.left = valuePX + 'px';
    }
  };

  /**
   * Mouse down handler
   * @constructor
   */
  SliderController.prototype.OnMouseDown = function () {
    this._isMouseDown = true;
    this._button.style.pointerEvents = 'none';
    this._button.style.touchAction = 'none';
  };

  /**
   * Mouse up handler
   * @constructor
   */
  SliderController.prototype.OnMouseUp = function () {
    this._isMouseDown = false;
    this._button.style.pointerEvents = 'initial';
    this._button.style.touchAction = 'initial';
  };

  /**
   * Mouse move handler
   * @param event
   * @constructor
   */
  SliderController.prototype.OnMouseMove = function (event) {
    if (!this._isMouseDown) {
      return;
    }

    if (this.isMobile()) {
      console.log(event.pageY);
      var newTop = this.getCoordinate(event.clientY, this._element.getBoundingClientRect().top, this._element.offsetHeight, this._button.offsetHeight);
      this._button.style.top = newTop + 'px';
    } else {
      var newLeft = this.getCoordinate(event.clientX, this._element.getBoundingClientRect().left, this._element.offsetWidth, this._button.offsetWidth);
      this._button.style.left = newLeft + 'px';
    }

    this._controls.querySelector('.filter__item--active').classList.remove('filter__item--active');
    this._controls.querySelector('.filter__item:first-child').classList.add('filter__item--active');
  };

  /**
   * Touch move handler
   * @param event
   * @constructor
   */
  SliderController.prototype.OnTouchMove = function (event) {
    if (!this._isMouseDown) {
      return;
    }

    if (event.touches.length !== 1) {
      return;
    }

    event.preventDefault();
    var touch = event.touches[0];

    if (this.isMobile()) {
      var newTop = this.getCoordinate(touch.pageY, this._element.getBoundingClientRect().top, this._element.offsetHeight, this._button.offsetHeight);
      this._button.style.top = newTop + 'px';
    } else {
      var newLeft = this.getCoordinate(touch.pageX, this._element.getBoundingClientRect().left, this._element.offsetWidth, this._button.offsetWidth);
      this._button.style.left = newLeft + 'px';
    }

    this._controls.querySelector('.filter__item--active').classList.remove('filter__item--active');
    this._controls.querySelector('.filter__item:first-child').classList.add('filter__item--active');
  };

  /**
   * Gets window state
   * @returns {boolean}
   */
  SliderController.prototype.isMobile = function () {
    return (window.innerWidth < 768);
  };

  /**
   * Gets coordinate
   * @param clickCoordinate
   * @param elementOffset
   * @param elementMax
   * @param handleSize
   * @returns {number}
   */
  SliderController.prototype.getCoordinate = function (clickCoordinate, elementOffset, elementMax, handleSize) {
    var newCoordinate = (clickCoordinate - elementOffset - (handleSize / 2));

    if (newCoordinate < 0) {
      newCoordinate = 0;
    }

    if (newCoordinate > elementMax - handleSize) {
      newCoordinate = elementMax - handleSize;
    }

    return newCoordinate;
  };

  window.SliderController = SliderController;

}());

var modalList = document.querySelectorAll('.modal-with-slider');

modalList.forEach(function (item) {
  var slider = item.querySelector('.lamp');
  var controls = item.querySelector('.modal__filter');

  new window.SliderController(slider, controls);
});

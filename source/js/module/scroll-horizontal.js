(function () {

  /**
   *
   * @param element
   * @constructor
   */
  function ScrollController(element) {
    this._element = element;
    this._container = null;
    this._btnLeft = null;
    this._btnRight = null;
    this.init();
  }

  /**
   * Initialization
   */
  ScrollController.prototype.init = function () {
    this._container = this._element.querySelector('.js-scroll-container');
    this._btnLeft = this._element.querySelector('.scroll-button--left');
    this._btnLeft.addEventListener('click', this.onBtnLeftClick.bind(this));
    this._btnRight = this._element.querySelector('.scroll-button--right');
    this._btnRight.addEventListener('click', this.onBtnRightClick.bind(this));
    this._container.addEventListener('scroll', this.updateScrollState.bind(this));
    this.updateScrollState();
  };

  /**
   *
   */
  ScrollController.prototype.updateScrollState = function () {
    var containerWidth = this._container.offsetWidth;
    var innerWidth = this._container.scrollWidth;
    var scrollLeft = this._container.scrollLeft;
    var maxScrollLeft = innerWidth - containerWidth;

    if (innerWidth > containerWidth) {
      if (scrollLeft === 0) {
        this.setBtnLeftEnabled(false);
      } else {
        this.setBtnLeftEnabled(true);
      }
      if (scrollLeft >= maxScrollLeft) {
        this.setBtnRightEnabled(false);
      } else {
        this.setBtnRightEnabled(true);
      }
    }

  };

  /**
   *
   * @param flag
   */
  ScrollController.prototype.setBtnLeftEnabled = function (flag) {
    if (flag) {
      this._btnLeft.classList.remove('scroll-button--disabled');
    } else {
      this._btnLeft.classList.add('scroll-button--disabled');
    }
  };

  /**
   *
   * @param flag
   */
  ScrollController.prototype.setBtnRightEnabled = function (flag) {
    if (flag) {
      this._btnRight.classList.remove('scroll-button--disabled');
    } else {
      this._btnRight.classList.add('scroll-button--disabled');
    }
  };

  /**
   *
   */
  ScrollController.prototype.onBtnLeftClick = function (event) {
    var flag = event.target.classList.contains('scroll-button--disabled');

    if (flag) {
      return;
    }

    var newScrollValue = this._container.scrollLeft - this.getScrollValue('left');
    this.scrollTo(this._container, newScrollValue, 500);
  };

  /**
   *
   */
  ScrollController.prototype.onBtnRightClick = function (event) {
    var flag = event.target.classList.contains('scroll-button--disabled');

    if (flag) {
      return;
    }

    var newScrollValue = this._container.scrollLeft + this.getScrollValue('right');
    this.scrollTo(this._container, newScrollValue, 500);
  };

  ScrollController.prototype.getScrollValue = function (direction) {
    var itemW = 200 + 15;
    var containerW = this._container.offsetWidth;
    var visible = Math.floor(containerW / itemW);
    var r = visible * itemW;
    var s = this._container.scrollLeft % itemW;
    if (direction === 'right') {
      r -= s;
    } else {
      r += s;
    }
    return r;
  };

  /**
   *
   * @param element
   * @param to
   * @param duration
   */
  ScrollController.prototype.scrollTo = function (element, to, duration) {
    var start = element.scrollLeft,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var self = this;

    var animateScroll = function () {
      currentTime += increment;
      var val = self.easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };

  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  ScrollController.prototype.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  window.ScrollController = ScrollController;

}());

var containerList = document.querySelectorAll('.js-scroll');

containerList.forEach(function (item) {
  new window.ScrollController(item);
});

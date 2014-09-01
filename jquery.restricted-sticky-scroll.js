/*!
 * Restricted Sticky Scroll v1.0
 * Copyright 2014, Pablo Fabregat
 */
(function($) {
  $.fn.restrictedStickyScroll = function(options) {

    var defaults = {
      'childObject': this.find('div').first(),
      'easing': 'swing',
      'duration': 0
    };
    var options = $.extend({}, defaults, options);

    var sticky = {
      'el': options.childObject,
      'height': options.childObject.outerHeight(true),
      'left': options.childObject.offset().left,
      'top': options.childObject.offset().top,
      'wrapperHeight': this.outerHeight(true)
    };

    var measures = {
      'el' : this,
      'wrapperTop': this.offset().top,
      'wrapperHeight': this.height(),
      'wrapperOuterHeight': this.outerHeight(),
      'wrapperLeft': this.offset().left,
      'wrapperWidth': this.width(),
      'topPos': $(this).wrapperOuterHeight - sticky.el.outerHeight(),
      'scrollPos': $(window).scrollTop() - $(this).wrapperTop,
      'windowTop': $(window).scrollTop()
    };

    if (measures.wrapperHeight > sticky.height) {
      $(window).scroll(function() {
        measures.wrapperOuterHeight = measures.el.outerHeight();
        measures.topPos = measures.wrapperOuterHeight - sticky.el.outerHeight();
        measures.scrollPos = $(window).scrollTop() - measures.wrapperTop;
        measures.windowTop = $(window).scrollTop();

        if ($(window).scrollTop() >= measures.wrapperTop) {
          if (($(window).scrollTop() - measures.wrapperTop) < measures.topPos) {
            sticky.el.stop().animate({
              top: ($(window).scrollTop() - measures.wrapperTop) + "px"
            }, {
              easing: options.easing,
              duration: options.duration
            });
          } else {
            sticky.el.stop().animate({
              top: measures.topPos + "px"
            }, {
              easing: options.easing,
              duration: options.duration
            });
          }
        } else {
          resetSticky();
        }
      });

      $(window).resize(function() {

      });
    }

    function resetSticky() {
      sticky.el.animate({
        top: "0px"
      }, {
        easing: options.easing,
        duration: options.duration
      });
    }
  };
})(jQuery);

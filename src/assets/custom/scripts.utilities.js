/**
 * Common functions - can be used in any application.
 */
function positionTop(e, t) {
  // Returns or sets the CSS 'top' property of the provided JQuery object e.
  if (!!t) {
    e.css('top', t);
  } else {
    if (e.css('position') == 'fixed') {
      return +e.css('top').replace('px', '');
    } else {
      return e.offset().top;
    }
  };
};
function positionBottom(e, m) {
  // Returns the bottom position of the provided element JQuery object e.
  if (!!m) {
    return e.offset().top + e.outerHeight(true);
  } else {
    return e.offset().top + e.outerHeight();
  };
};
function sizeHeight(e, m, h) {
  // Returns or sets the CSS 'height' property of the provided JQuery object e.
  if (!!m) {
    return e.outerHeight(true);
  } else if (!!h) {
    e.css('height', h);
  } else {
    return e.outerHeight();
  };
};
function sizeHeightDifference(e) {
  // Returns the difference between 'outerHeight(true)' and 'outerHeight()' values of the provided JQuery object e.
  return e.outerHeight(true) - e.height();
};
function scrollHeight(e) {
  // Returns the 'scrollHeight' property of the provided JQuery object e.
  return e.prop('scrollHeight');
};
function getFunctionName() {
  // Returns the name of the calling function, thanks to https://stackoverflow.com/a/48613926
  return getFunctionName.caller.name;
};

/**
 * Bootstrap functions
 */
function navActive(e) {
  // Sets/gets the active nav item using the class 'active'.
  if (e) {
    if (e.hasClass('active')) {
      return;
    } else {
      e.parent().parent().find('.active').removeClass('active');
      e.addClass('active');
    };
  } else {
    return $('.active').prop('id').replace('navItem', '');
  };
};
function navExpanded() {
  // Tests if the navbar is expanded when the 'toggler' button is visible.
  var nt = $('.navbar-toggler')
  if (nt.is(':visible')) {
    return true;
  } else {
    return false;
  };
};
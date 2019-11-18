function display__mediaContent(display) {
  if (display) {
    $('#productDetailsDescription').hide();
    $('#mediaSearch').show();
    $('#mediaMain').show();
  } else {
    $('#productDetailsDescription').show();
    $('#mediaSearch').hide();
    $('#mediaMain').hide();
  };
};
function load__productData() {
  var b = window.productBrand;
  var p = window.productDetails;
  document.title = p.code + ' | ' + p.title;
  switch (p.format) {
    case 'audio':
      $('#navItemVideo').hide();
      break;
    case 'video':
      $('#navItemAudio').hide();
      break;
  };
  $('#productDetailsTitle').text(p.title);
  $('#productDetailsStrapLine').text(p.strap);
  $('#productDetailsDescription').html(p.description);
  if (b.img == true) {
    var addHtml1 = '<a id="productBrandCollapse" class="navbar-brand d-md-none" href="#" target="_blank" rel="noopener noreferrer"><img class="img-fluid img-brand img-product-brand" src="product/brand-logo.png" alt="productBrandImgAlt"></a>'
    var addHtml2 = '<a id="productBrand" class="navbar-brand navbar-product-brand d-none d-md-block text-right mr-2" href="#" target="_blank" rel="noopener noreferrer"><img class="img-fluid img-brand img-product-brand" src="product/brand-logo.png" alt="productBrandImgAlt"></a>'
    $('#mainBrand').after(addHtml1);
    $('#productBrand').replaceWith(addHtml2);
    $('.navbar-product-brand').attr('href', b.uri);
    $('.img-product-brand').prop('alt', b.alt);
  };
  if (b.background == true) {
    $('.page-background-image').css('background-image', 'url(\'product/background.jpg\')');
  };
};

function build__tracklist(mt) {
  var tracks = window['tracklist' + mt];
  $('#tracklist').html('');
  for (var i = 0; i < tracks.length; i++) {
    var html = '<div class="row track-row flex-nowrap rowEvenOdd mx-1 px-2" data-item="fileName"><div class="track__number flex-shrink-0 text-right mr-2">trackNumber</div><div class="track__track flex-grow-1 ml-1">trackArtistName - trackTitle</div><div class="track__length flex-shrink-0 ml-auto">trackLength</div></div>';
    var t = tracks[i];
    if (t.trackNumber % 2 == 0) {
      var rowEvenOdd = 'track-row-even';
    } else {
      var rowEvenOdd = 'track-row-odd';
    };
    html = html.replace('rowEvenOdd', rowEvenOdd);
    html = html.replace('fileName', t.fileName);
    html = html.replace('trackNumber', t.trackNumber);
    html = html.replace('trackArtistName', t.artistName);
    html = html.replace('trackTitle', t.trackTitle);
    html = html.replace('trackLength', t.trackLength);
    $(html).appendTo('#tracklist');
  };
};

function set__mainTop() {
  var mn = $('main');
  var newT = sizeHeight($('header'));
  var nbn = $('.navbar-nav');

  if (positionBottom(nbn) > 0 && $('.navbar-toggler').is(':visible')) {
    newT = newT - sizeHeight(nbn);
  }
  if (positionTop(mn) !== newT) {
    positionTop(mn, newT);
  };
};
function set__mainHeight() {
  var hdr = $('header');
  var ftr = $('footer');
  var mn = $('main');
  var nbn = $('.navbar-nav');
  var newH = sizeHeight($(window)) - sizeHeight(hdr) - sizeHeight(ftr);
  if ($('.plyr__controls').length && !navActive() !== 'Home') {
    newH = newH - sizeHeight($('.plyr__controls'));
  };
  if (positionBottom(nbn) > 0 && $('.navbar-toggler').is(':visible')) {
    newH = newH + sizeHeight(nbn);
  }
  if (sizeHeight(mn) !== newH) {
    sizeHeight(mn, null, newH);
  };
};
function set__contentContainerHeight() {
  var h = sizeHeight($('#contentWrapper')) - sizeHeightDifference($('#contentWrapper'));
  sizeHeight($('#contentContainer'), null, h);
};

function is__videoStacked() {
  if ($('video').length && (positionTop($('#mediaPlayerContainer')) !== positionTop($('#tracklistContainer')))) {
    return true;
  } else {
    return false;
  };
};
function set__mediaMainHeight() {

  var cc = $('#contentContainer');
  var mmn = $('#mediaMain');
  var mpc = $('#mediaPlayerContainer');
  var tlc = $('#tracklistContainer');
  var tl = $('#tracklist');
  var plr = $('.plyr--video');

  if (is__videoStacked()) {
    var newH = sizeHeight(cc) - (positionTop(mmn) - positionTop(cc));
    sizeHeight(mmn, null, newH);
    mmn.addClass('overflow-auto');
    mmn.addClass('mr-1');
    mpc.removeClass('mx-3');
    mpc.addClass('ml-3');
    mpc.addClass('mr-1');
    mpc.addClass('mb-1');
    plr.addClass('mx-1');
    tlc.removeClass('mx-3');
    tlc.addClass('ml-3');
    tlc.addClass('mr-1');
    tl.removeClass('mx-1');
  } else {
    sizeHeight(mmn, null, 'initial');
    mmn.removeClass('overflow-auto');
    mmn.removeClass('mr-1');
    mpc.removeClass('ml-3');
    mpc.removeClass('mr-1');
    mpc.removeClass('mb-1');
    plr.removeClass('mx-1');
    tlc.removeClass('ml-3');
    tlc.removeClass('mr-1');
    tl.removeClass('mx-1');
    if ($('video').length) {
      mpc.removeClass('mx-1');
      mpc.addClass('mx-3');
      plr.addClass('ml-1');
      tlc.addClass('mr-3');
    } else {
      mpc.addClass('mx-1');
      tlc.removeClass('mr-3');
      tl.addClass('mx-1');
    }
  };

};
function set__tracklistHeight() {
  var tl = $('#tracklist');
  var cc = $('#contentContainer')

  if (is__videoStacked()) {
    sizeHeight($('#tracklist'), null, 'initial');
  } else {
    var newH = sizeHeight(cc) - (positionTop(tl) - positionTop(cc));
    if (scrollHeight(tl) > newH) {
      tl.addClass('overflow-auto');
      $('.tracklist-header .track__length').addClass('mr-3');
      sizeHeight(tl, null, newH);
    } else {
      tl.removeClass('overflow-auto');
      $('.tracklist-header .track__length').removeClass('mr-3');
    };
  }
};

function set__pageLayout() {
  set__mainTop();
  set__mainHeight();
  set__contentContainerHeight();
  if ($('audio').length || $('video').length) {
    set__mediaMainHeight();
    set__tracklistHeight();
  };

  //if ($('.track-row').length > 5) {
  //set__tracklistHeight();
  //};

  //var cc = $('#contentContainer');
  //var mmn = $('#mediaMain');
  //var mpc = $('#mediaPlayerContainer');
  //var tlc = $('#tracklistContainer');

  //if ($('video').length && (positionTop(mpc) !== positionTop(tlc))) {
  //  $('#mediaMain').addClass('overflow-auto');
  //  mpc.addClass('mb-1');

  //} else {
  //  $('#mediaMain').removeClass('overflow-auto');
  //  mpc.removeClass('mb-1');
  //  if ($('audio').length || $('video').length) {
  //    set__tracklistHeight();
  //  };
  //};

  //var mmn = $('#mediaMain');
  //if ($('video').length) {
  //  set__mediaMainHeight();
  //};
  //if ($('video').length) {
  //  var mpc = $('#mediaPlayerContainer');
  //  var tlc = $('#tracklistContainer')
  //  if (positionTop(mpc) !== positionTop(tlc)) {
  //    mpc.addClass('mb-1');
  //    if (scrollHeight(tlc) > 99 && (positionBottom(mmn) < positionBottom($('#tracklist')))) {
  //      mmn.addClass('mr-1');
  //      mmn.addClass('overflow-y-scroll');
  //    } else {
  //      mmn.removeClass('mr-1');
  //      mmn.removeClass('overflow-y-scroll');
  //    };
  //  } else {
  //    mpc.removeClass('mb-1');
  //    mmn.removeClass('mr-1');
  //    mmn.removeClass('overflow-y-scroll');
  //  };
  //} else if ($('audio').length) {
  //  mmn.removeClass('mr-1');
  //  mmn.removeClass('overflow-y-scroll');
  //};
  //set__mediaMainHeight();
};
function set__displayedContent() {
  var an = navActive();
  if (an !== 'Home') {
    tlc = $('#tracklistContainer')
  };
  switch (an) {
    case 'Home':
      display__mediaContent(false);
      set__mainHeight();
      break;
    case 'Audio':
      //tlc.removeClass('mx-3');
      tlc.addClass('container-fluid');
      var pHtml = '<audio playsinline controls id="player" class="plr-main" src=""></audio>';
      break;
    case 'Video':
      //tlc.addClass('mx-3');
      tlc.removeClass('container-fluid');
      var pHtml = '<video playsinline controls id="player" poster="posterSource" class="plr-main" src=""></video>'
      if (window.productBrand.poster) {
        pHtml = pHtml.replace('posterSource', 'product/poster.png')
      } else {
        pHtml = pHtml.replace('posterSource', 'assets/images/poster.png')
      };
      break;
  };
  if (an !== 'Home') {
    display__mediaContent(true);
    $('#mediaPlayerContainer').html(pHtml);
    var player = new Plyr('#player', { hideControls: false });
    build__tracklist(an);
  };
  //set__pageLayout();
};

function set__videoControlsFullScreen() {
  if ($('video').length) {
    if (player.plyr.fullscreen.active) {
      $('.plyr--video .plyr__controls').addClass('plyr__controls--fullscreen');
      player.plyr.config.hideControls = true;
    } else {
      $('.plyr--video .plyr__controls').removeClass('plyr__controls--fullscreen');
      player.plyr.config.hideControls = false;
    };
  };
};
function invoke__mediaPlayback(e) {
  var f = encodeURIComponent(e.attr('data-item'));
  if (f.match('mp3$')) {
    f = 'content/mp3/' + f;
  } else {
    f = 'content/mp4/' + f;
  };
  if ($('#player').attr('src') != f) {
    e.parent().find('.track-row-selected').removeClass('track-row-selected');
    e.addClass('track-row-selected');
    $('#player').attr('src', f);
  };
  player.plyr.play();
};

$('.navbar-nav .nav-link').click(function () {
  if ($(this).prop('id').replace('navItem', '') !== navActive()) {
    navActive($(this));
    set__displayedContent();
  };
});
$('.has-clear input[type="text"').on('focus blur', function () {
  $('.has-clear').toggleClass('form-group-glow');
});
$('.has-clear input[type="text"]').on('input propertychange', function () {
  var v = Boolean($(this).val());
  $('.form-control-icon-clear').toggleClass('d-none', !v);
}).trigger('propertychange');
$('.form-control-icon-clear').click(function () {
  $('.has-clear input[type="text"]').val('').trigger('propertychange').focus();
  $('#tracklist').children('.track-row').each(function () {
    $(this).show();
  });
  set__pageLayout();
});
$('#searchTracklist').on('keyup', function () {
  var v = $(this).val().toLowerCase();
  $('#tracklist').children('.track-row').each(function () {
    if ($(this).text().toLowerCase().indexOf(v) > -1) {
      $(this).show();
    }
    else {
      $(this).hide();
    };
    set__pageLayout();
  });
});

$(window).on('load', function () {
  load__productData();
  display__mediaContent(false);
});
$(window).on('load ready resize', function () {
  set__pageLayout();
});
$(window).on('ready', function () {
  $('.track-row').click(function () {
    invoke__mediaPlayback($(this));
  });
});
$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function () {
  set__videoControlsFullScreen();
});
/* jshint unused:false */

// SCRIPT FOR GT
// BY MICHAEL DIJKSTRA (2016)

// On touch devices show a gif,
// on all other devices load a video
// Only show when comes into view
//
// Example HTML
// <div class="js-gt-video" data-gif="animations/design/type_a.gif" data-mp4="animations/design/type_a.mp4"></div>

var GTVideo= function() {
  this.init();
};

GTVideo.prototype = {
  settings: {
    fraction: 0,
    offsetX: 200,
    offsetY: 200
  },


  init: function() {
    var self = this;
    var showVideo = false;
    // Only show video on non touch devices
    if ($('html.no-touch').length) {
      showVideo = true;
    }

    $('.js-gt-video').each(function() {
      var mp4 = $(this).attr('data-mp4');
      var gif = $(this).attr('data-gif');

      if (showVideo) {
        if (mp4 != undefined) {
          $(this).append('<video loop><source src="' + mp4 + '" type="video/mp4"></video>');
        }
      } else {
        if (gif != undefined) {
          $(this).append('<img src="' + gif + '"/>');
        }
      }
    });

    $(window).on('load scroll resize', function() {
      if (showVideo) { self.playVideo() }
    });
  },

  playVideo: function() {
    var self = this;
    $('.js-gt-video video').each(function() {
      var video = $(this).get(0);

      var x = video.offsetLeft, y = video.offsetTop, w = video.offsetWidth, h = video.offsetHeight,
      r = x + w, //right
      b = y + h, //bottom
      visibleX, visibleY, visible;

      visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x + self.settings.offsetX, r - window.pageXOffset));
      visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y + self.settings.offsetY, b - window.pageYOffset));

      visible = visibleX * visibleY / (w * h);

      if (visible > self.settings.fraction) {
        $(this).addClass('is-playing');
        video.play();
      } else {
        $(this).removeClass('is-playing');
        video.pause();
      }
    });
  }
}

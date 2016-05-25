'use strict';

var Backbone = require('backbone');
import template from 'lodash/template';
var $ = require("jquery");
var fs = require("fs");
var fecha = require("fecha");

module.exports = Backbone.View.extend({
  template: fs.readFileSync(__dirname + '/../templates/player.ejs', 'utf8'),
  mixcloudTemplate: fs.readFileSync(__dirname + '/../templates/mixcloudPlayer.ejs', 'utf8'),
  apiUrl: "http://airtime.frequency.asia/api/live-info",
  streamSource: "http://airtime.frequency.asia:8000/airtime_128",
  events: {
    "click #play-stream": "toggleStream",
    "click #load-stream-btn": "reloadStream",
  },
  mixcloudURL: null,

  render: function render() {
    this.$el.html(template(this.template));
    this.getNowPlaying();
    this.renderVolume();
    if (typeof window.orientation === 'undefined') {
      // This shoud detect mobile devices. Might not be a catch all (i.e. some non-mobile devices might get caught).
      this.toggleStream();
    }
    return this;
  },

  reloadStream: function reloadStream() {
    // Go from Mixcloud player to stream player.
    this.mixcloudURL = null;
    this.render();
    this.toggleStream();
  },

  renderMixcloudEmbed: function renderMixcloudEmbed() {
    this.$el.html(template(this.mixcloudTemplate)({ url: this.mixcloudURL }));
    window.scrollTo(0, 0);
    return this;
  },

  toggleStream: function toggleStream(event) {
    var stream = document.getElementById('stream-player');
    if (!stream.paused) {
      this.$('.js-stream-status').removeClass("icon-pause2").addClass("icon-play3");
      stream.pause();
    } else {
      this.$('.js-stream-status').removeClass("icon-play3").addClass("icon-pause2");
      stream.play();
    }
  },

  getNowPlaying: function getNowPlaying() {
    var setNowPlaying = function(url, hasError) {
      $('.js-now-playing-link').attr('href', url);
      if (url === "#") {
        $('.js-now-playing-text').text("home");
      } else {
        $('.js-now-playing-text').text("now playing");
      }
    };
    var setPlayerMetadata = function(text, hasError) {
      $('.js-stream-text').html(text);
    };
    $.getJSON("http://airtime.frequency.asia/api/live-info")
      .done(function(data) {
        if (data && data.current) {
          if (data.current.name) {
            var splitStrings = data.current.name.split('|');
            var name = splitStrings[0].trim();
            var url = "";
            if (splitStrings.length > 1) {
              url = splitStrings[1].trim();
            }
            setNowPlaying(url);
            setPlayerMetadata('<a href="' + url + '">' + name + '</a>');
          } else {
            setNowPlaying('#', true);
            setPlayerMetadata('Offline', true);
          }
          if (data.next.starts) {
            var time = data.next.starts.split('.'); // Get rid of the ms because they're hard to parse.
            var endTime = fecha.parse(time[0], "YYYY-MM-DD HH:mm:ss");
            var endTimestamp = endTime.getTime() + (8 * 60 * 60 * 1000) + 1000; // Add hours to get timezone right, plus 1 second to account for those milliseconds we reomved before.
            var now = new Date().getTime();
            var diff = endTimestamp - now;
            window.setTimeout(getNowPlaying, diff);
          }
        } else {
          setNowPlaying('#', true);
          setPlayerMetadata('Offline', true);
        }
      });
  },

  renderVolume: function renderVolume() {
    var $input = $('#volume-slider');
    var steps = $input.attr('data-steps');
    var defValue = $input.attr('value');
    var $slider = $("<div class='vslider'><div class='vslider_bar'></div><ul class='vslider_sticks'></div>").appendTo($input.parent());
    $input.hide();

    for (var i = 0; i < steps; i++) {
      var $stick = $('<li><div class="vslider_stick"a></div></li>').appendTo($slider.find('.vslider_sticks'));
      $stick.on('mouseenter', function(){
        $(this).addClass('active');
      }).on('mouseleave', function(){
        $(this).removeClass('active');
    });

    var startDrag = function (event) {
       renderUI(getPercent(event));
       $(document.body).on('mousemove', onDrag);
       $(document.body).on('mouseup', stopDrag);
     },
     stopDrag = function (event) {
       $(document.body).off('mouseup', stopDrag);
       $(document.body).off('mousemove', onDrag);
     },
     onDrag = function (event) {
       var percent = getPercent(event);
       renderUI(percent);
       var stream = document.getElementById("stream-player");
       stream.volume = percent;
     };
    }
    var renderUI = function(percent) {
      var index = Math.round(percent * steps);
      index = index < steps ? index : steps;

      $('.vslider_sticks > li').find('div').css('opacity', 0);

      for(var i = 0; i < index; i++) {
        $('.vslider_sticks > li:eq(' + i + ')').find('div').css('opacity', 1);
      }
    };
    renderUI(defValue);

    var getPercent = function(event) {
      var percent = (event.pageX - $slider.offset().left) / $('.vslider_sticks').width();
      percent = percent >= 0 ? percent : 0;
      percent = percent <= 1 ? percent : 1;
      return percent;
    };

    $slider.on('mousedown', startDrag);
  },

  setMixcloudURL: function setMixcloudURL(url) {
    if (url !== this.mixcloudURL) {
      this.mixcloudURL = url;
      this.renderMixcloudEmbed();
    }
  }
});

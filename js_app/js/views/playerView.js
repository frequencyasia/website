'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var fs = require("fs");
var $ = require("jquery");
var template = fs.readFileSync(__dirname + '/../templates/player.ejs', 'utf8');
var mixcloudTemplate = fs.readFileSync(__dirname + '/../templates/mixcloudPlayer.ejs', 'utf8');

module.exports = Backbone.View.extend({
  apiUrl: "http://airtime.frequency.asia/api/live-info",
  streamSource: "http://airtime.frequency.asia:8000/airtime_128",
  events: {
    "click #play-stream": "toggleStream",
    "click #load-stream-btn": "reloadStream",
  },
  mixcloudURL: null,

  render: function render() {
    this.$el.html(_.template(template));
    this.getNowPlaying();
    this.renderVolume();
    return this;
  },

  reloadStream: function reloadStream() {
    // Go from Mixcloud player to stream player.
    this.mixcloudURL = null;
    this.render();
    this.toggleStream();
  },

  renderMixcloudEmbed: function renderMixcloudEmbed() {
    this.$el.html(_.template(mixcloudTemplate)({url: this.mixcloudURL}));
    return this;
  },

  toggleStream: function toggleStream(event) {
    var stream = document.getElementById('stream-player');
    if (!stream.paused) {
      console.log('pause');
      this.$('.js-stream-status').removeClass("fa-pause").addClass("fa-play");
      stream.pause();
    } else {
      console.log('play');
      this.$('.js-stream-status').removeClass("fa-play").addClass("fa-pause");
      stream.play();
    }
  },

  getNowPlaying: function getNowPlaying() {
    var setNowPlaying = function(text, hasError) {
      $('.js-stream-text').text(text);
    };
    $.getJSON("http://airtime.frequency.asia/api/live-info")
      .done(function(data) {
        if (data && data.current) {
          if (data.current.name.length) {
            setNowPlaying(data.current.name);
          } else {
            setNowPlaying('Offline', true);
          }
        } else {
          setNowPlaying('Offline', true);
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
'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var $ = require("jquery");
var fs = require("fs");
var moment = require("moment");
var template = fs.readFileSync(__dirname + '/../templates/show.ejs', 'utf8');

module.exports = Backbone.View.extend({
  className: 'c-show',
  tagName: 'section',

  events: {
    'click .js-play-episode': 'onPlayEpisodeClicked',
  },

  initialize: function(options) {
    var _this = this;
    $.getJSON(window.app.apiURL + "/api/shows/" + options.slug)
      .done((data) => {
        for (var item of data.episodes) {
          item.date = moment(item.start_time).format('dddd / MMMM D YYYY');
        }
        this.showData = data;
        this.render();
      });
  },

  render: function render() {
    this.$el.html(_.template(template)({"data": this.showData}));
    this.$('.post-module').hover(function() {
      $(this).find('.description').stop().animate({height: "toggle", opacity: "toggle"}, 300);
    });
    this.$('.c-episode__description-toggle').click((event) => {
      var $el = $(event.currentTarget)
      if ($el.next().hasClass("c-episode__description--toggled")) {
        $el.next().removeClass("c-episode__description--toggled");
        $el.text('+ More Info');
      } else {
        $el.next().addClass("c-episode__description--toggled");
        $el.text('- Less Info');
      }

    });
    return this;
  },

  onPlayEpisodeClicked: function onPlayEpisodeClicked(event) {
    var url = this.$(event.currentTarget).data("mixcloud");
    window.app.views.playerView.setMixcloudURL(url);
  },
});
'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var $ = require("jquery");
var fs = require("fs");
var fecha = require("fecha");
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
        for (var i = 0; i < data.episodes.length; i++) {
          var item = data.episodes[i];
          item.date = fecha.format(new Date(item.start_time), 'dddd / MMMM D YYYY');
        }
        this.showData = data;
        this.render();
        document.title = this.showData.name + " | Frequency Asia";
      });
  },

  render: function render() {
    this.$el.html(_.template(template)({"data": this.showData}));
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
'use strict';

var Backbone = require('backbone');
import template from 'lodash/template';
var $ = require("jquery");
var fs = require("fs");
var fecha = require("fecha");

module.exports = Backbone.View.extend({
  template: fs.readFileSync(__dirname + '/../templates/show.ejs', 'utf8'),
  className: 'c-show',
  tagName: 'section',

  events: {
    'click .js-play-episode': 'onPlayEpisodeClicked',
  },

  initialize: function(options) {
    var _this = this;
    $.getJSON("/api/v1.0/shows/" + options.slug)
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
    this.$el.html(template(this.template)({"data": this.showData}));
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
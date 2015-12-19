'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var $ = require("jquery");
var fs = require("fs");
var template = fs.readFileSync(__dirname + '/../templates/show.ejs', 'utf8');

module.exports = Backbone.View.extend({
  className: 'o-content-block',
  tagName: 'section',

  events: {
    'click .js-play-episode': 'onPlayEpisodeClicked',
  },

  initialize: function(options) {
    var _this = this;
    $.getJSON(window.app.apiURL + "/api/shows/" + options.slug)
      .done(function(data) {
        _this.showData = data;
        _this.render();
      });
  },

  render: function render() {
    this.$el.html(_.template(template)({"data": this.showData}));
    return this;
  },

  onPlayEpisodeClicked: function onPlayEpisodeClicked(event) {
    var url = this.$(event.currentTarget).data("mixcloud");
    window.app.views.playerView.setMixcloudURL(url);
  },
});
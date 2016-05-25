'use strict';

var Backbone = require('backbone');
import template from 'lodash/template';
var fs = require("fs");
var $ = require("jquery");
var fecha = require("fecha");

module.exports = Backbone.View.extend({
  template: fs.readFileSync(__dirname + '/../templates/tag.ejs', 'utf8'),
  artistTemplate: fs.readFileSync(__dirname + '/../templates/artistTag.ejs', 'utf8'),
  className: 'o-content-block',

  events: {
    'click .js-play-episode': 'onPlayEpisodeClicked',
  },

  initialize: function(options) {
    this.tagType = options.type;
    if (this.tagType === 'artists') {
      this.tagTypePretty = "Artists";
      this.template = this.artistTemplate;
    } else if (this.tagType === 'cities') {
      this.tagTypePretty = "Cities";
    } else {
      this.tagTypePretty = "Countries";
    }
    $.getJSON("/api/v1.0/" + this.tagType + "/" + options.slug)
      .done((data) => {
        for (var i = 0; i < data.episodes.length; i++) {
          data.episodes[i].date = fecha.format(new Date(data.episodes[i].start_time), 'dddd / MMMM D YYYY');
        }
        this.tagData = data;
        this.render();
        document.title = data.name + " | " + this.tagTypePretty + " | Frequency Asia";
      });
  },

  render: function render() {
    if (this.tagType === 'artists') {
      this.$el.html(template(this.template)({
        'type': this.tagType,
        'typePretty': this.tagTypePretty,
        'data': this.tagData,
      }));
      this.$('#location-data').html(this.parseArtistLocationData());
    } else {
      this.$el.html(template(this.template)({
        'type': this.tagType,
        'typePretty': this.tagTypePretty,
        'data': this.tagData,
      }));
    }
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

  parseArtistLocationData: function parseArtistLocationData() {
    // Returns a string with location data for the artist (including links) if available.
    let str = '';
    if (this.tagData) {
      if (this.tagData.country) {
        str = `<a href="#wiki/countries/${this.tagData.country.slug}">${this.tagData.country.name}</a>`;
      }
      if (this.tagData.country && this.tagData.city) {
        str = ', ' + str;
      }
      if (this.tagData.city) {
        str = `<a href="#wiki/cities/${this.tagData.city.slug}">${this.tagData.city.name}</a>` + str;
      }
    }
    return str;
  },

  onPlayEpisodeClicked: function onPlayEpisodeClicked(event) {
    var url = this.$(event.currentTarget).data("mixcloud");
    window.app.views.playerView.setMixcloudURL(url);
  },
});

'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var fs = require("fs");
var $ = require("jquery");
var fecha = require("fecha");
var template = fs.readFileSync(__dirname + '/../templates/tag.ejs', 'utf8');
var artistTemplate = fs.readFileSync(__dirname + '/../templates/artistTag.ejs', 'utf8');

module.exports = Backbone.View.extend({
  className: 'o-content-block',

  events: {
    'click .js-play-episode': 'onPlayEpisodeClicked',
  },

  initialize: function(options) {
    this.tagType = options.type;
    if (this.tagType === 'artist') {
      this.tagTypePretty = "Artists";
    } else if (this.tagType === 'city') {
      this.tagTypePretty = "Cities";
    } else {
      this.tagTypePretty = "Countries";
    }
    $.getJSON(window.app.apiURL + "/api/tags/" + this.tagType + "/" + options.slug)
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
    if (this.tagType === 'artist') {
      this.$el.html(_.template(this.template)({
        'type': this.tagType,
        'typePretty': this.tagTypePretty,
        'data': this.tagData,
        locationData: this.parseArtistLocationData(),
      }));
    } else {
      this.$el.html(_.template(this.template)({
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
    if (this.tagData.country && this.tagData.country_slug && this.tagData.country.length && this.tagData.country_slug.length) {
      str = `<a href="#wiki/country/${this.tagData.country_slug}">${this.tagData.country}</a>`;
    } else if (this.tagData.country && this.tagData.country.length) {
      str = this.tagData.country;
    }
    if (this.tagData.country && this.tagData.country.length && this.tagData.city && this.tagData.city.length) {
      str = ', ' + str;
    }
    if (this.tagData.city && this.tagData.city_slug && this.tagData.city.length && this.tagData.city_slug.length) {
      str = `<a href="#wiki/city/${this.tagData.city_slug}">${this.tagData.city}</a>` + str;
    } else if (this.tagData.city && this.tagData.city.length) {
      str = this.tagData.city + str;
    }
    return str;
  },

  onPlayEpisodeClicked: function onPlayEpisodeClicked(event) {
    var url = this.$(event.currentTarget).data("mixcloud");
    window.app.views.playerView.setMixcloudURL(url);
  },
});
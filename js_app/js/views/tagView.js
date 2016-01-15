'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var fs = require("fs");
var $ = require("jquery");
var fecha = require("fecha");
var template = fs.readFileSync(__dirname + '/../templates/tag.ejs', 'utf8');

module.exports = Backbone.View.extend({
  className: 'o-content-block',

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
        for (var item of data.episodes) {
          item.date = fecha.format(new Date(item.start_time), 'dddd / MMMM D YYYY');
        }
        this.tagData = data;
        this.render();
        document.title = data.name + " | " + this.tagTypePretty + " | Frequency Asia";
      });
  },

  render: function render() {
    this.$el.html(_.template(template)({
      'type': this.tagType,
      'typePretty': this.tagTypePretty,
      'data': this.tagData,
    }));
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
  }
});
'use strict';

var Backbone = require('backbone');
import template from 'lodash/template';
var $ = require("jquery");
var fs = require("fs");

module.exports = Backbone.View.extend({
  template: fs.readFileSync(__dirname + '/../templates/showList.ejs', 'utf8'),
  tagName: 'section',
  className: 'o-content-block u-full-width-mobile',
  shows: [],

  initialize: function() {
    var _this = this;
    $.getJSON("/api/v1.0/shows")
      .done(function(data) {
        _this.shows = data.shows;
        _this.render();
      });
  },

  render: function render() {
    this.$el.html(template(this.template)({"data": this.shows}));
    this.$('.post-module').hover(function() {
      $(this).find('.description').stop().animate({height: "toggle", opacity: "toggle"}, 300);
    });
    return this;
  },
});

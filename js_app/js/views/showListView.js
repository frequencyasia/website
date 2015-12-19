'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var $ = require("jquery");
var fs = require("fs");
var template = fs.readFileSync(__dirname + '/../templates/showlist.ejs', 'utf8');

module.exports = Backbone.View.extend({

  tagName: 'section',
  className: 'o-content-block',
  shows: [],

  initialize: function() {
    var _this = this;
    $.getJSON(window.app.apiURL + "/api/shows/")
      .done(function(data) {
        _this.shows = data.shows;
        _this.render();
      });
  },

  render: function render() {
    this.$el.html(_.template(template)({"data": this.shows}));
    this.$('.post-module').hover(function() {
      $(this).find('.description').stop().animate({height: "toggle", opacity: "toggle"}, 300);
    });
    return this;
  },
});
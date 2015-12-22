'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var fs = require("fs");
var $ = require("jquery");
var template = fs.readFileSync(__dirname + '/../templates/nav.ejs', 'utf8');

module.exports = Backbone.View.extend({
  render: function render() {
    this.$el.html(_.template(template));
    return this;
  },

  setActivePage: function setActivePage() {
    $(".js-nav-item").removeClass("c-nav__item--active").addClass("c-nav__item")
    var url = "#" + window.location.href.split("#")[1];
    var $navItem = $('.js-nav-item a[href="' + url + '"]');
    if ($navItem.length) {
      $navItem.parent().removeClass('c-nav__item').addClass('c-nav__item--active');
    }
  },
});
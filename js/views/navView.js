'use strict';

var Backbone = require('backbone');
import template from 'lodash/template';
var fs = require("fs");
var $ = require("jquery");

module.exports = Backbone.View.extend({
  template: fs.readFileSync(__dirname + '/../templates/nav.ejs', 'utf8'),

  render: function render() {
    this.$el.html(template(this.template));
    return this;
  },

  setActivePage: function setActivePage() {
    $(".js-nav-item").removeClass("c-nav__item--active").addClass("c-nav__item")
    var subURL = window.location.href.split("#")[1];
    if (subURL === undefined) {
        $('.js-nav-item').first().removeClass('c-nav__item').addClass('c-nav__item--active');
    } else {
      var url = "#" + subURL;
      var $navItem = $('.c-nav a[href="' + url + '"]');
      if ($navItem.length) {
        $navItem.children().removeClass('c-nav__item').addClass('c-nav__item--active');
      }
    }
  },
});
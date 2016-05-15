'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var fs = require("fs");
var $ = require("jquery");
require('swiper');
var template = fs.readFileSync(__dirname + '/../templates/main.ejs', 'utf8');

module.exports = Backbone.View.extend({
  className: 'o-feature-slider',
  showcaseItems: [],

  render: function render() {
    this.$el.html(_.template(template)({
      items: this.showcaseItems,
    }));
    return this;
  },

  initSwiper: function() {
    // Needs to be triggered after Virtual DOM is attached.
    if (this.$('.swiper-container').length) {
      this.swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          preventClicks: false,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          keyboardControl: true,
          autoplay: 5000,
      });
    }
  },

  getShowcaseItems: function getShowcaseItems() {
    // Return maximum of 5 episodes to showcase on the main page.
    $.getJSON(window.app.apiURL + "/api/new-episodes")
      .done((data) => {
        this.showcaseItems = data.items;
        this.render();
        this.initSwiper();
      });
  }
});
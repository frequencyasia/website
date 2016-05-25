'use strict';

var Backbone = require('backbone');
import template from 'lodash/template';
var fs = require("fs");
var $ = require("jquery");
require('swiper');

module.exports = Backbone.View.extend({
  template: fs.readFileSync(__dirname + '/../templates/main.ejs', 'utf8'),
  className: 'o-feature-slider',
  episodes: [],

  render: function render() {
    this.$el.html(template(this.template)({
      items: this.episodes,
    }));
    return this;
  },

  initSwiper: function initSwiper() {
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
    $.getJSON('/api/v1.0/episodes/released?length=5&showcase=true')
      .done((data) => {
        this.episodes = data.episodes;
        this.render();
        this.initSwiper();
      });
  },
});

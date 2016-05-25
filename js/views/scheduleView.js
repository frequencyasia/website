'use strict';

var Backbone = require('backbone');
import template from 'lodash/template';
import keys from 'lodash/keys';
var $ = require("jquery");
var fs = require("fs");
var fecha = require("fecha");

module.exports = Backbone.View.extend({
  className: 'o-content-block',
  template: fs.readFileSync(__dirname + '/../templates/schedule.ejs', 'utf8'),

  initialize: function(options) {
    var _this = this;
    $.getJSON("/api/v1.0/episodes/scheduled")
      .done((data) => {
        this.scheduleData = data.episodes;
        this.render();
      });
  },

  render: function render() {
    this.$el.html(template(this.template)({ schedule: this.getSchedule() }));
    return this;
  },

  getSchedule: function getSchedule() {
    const parsedSchedule = [];
    if (!this.scheduleData) {
      return parsedSchedule;
    }
    const days = {};
    this.scheduleData.map((episode) => {
      episode.scheduleTime = fecha.format(episode.start_time, 'HHmm') + ' - ' + fecha.format(episode.end_time, 'HHmm');
      const day = episode.start_time - episode.start_time % 86400000;
      if (days.hasOwnProperty(day)) {
        days[day].shows.push(episode);
      } else {
        days[day] = { shows: [episode] };
      }
    });
    keys(days).map((key) => {
      days[key].heading = fecha.format(days[key].shows[0].start_time, 'dddd / MMMM D').toUpperCase();
      parsedSchedule.push(days[key]);
    });
    parsedSchedule.sort((itemA, itemB) => {
      return itemA.shows[0].start_time - itemB.shows[0].start_time;
    });
    return parsedSchedule;
  },
});
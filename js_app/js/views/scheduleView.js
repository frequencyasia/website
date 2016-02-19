'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var $ = require("jquery");
var fs = require("fs");
var fecha = require("fecha");
var template = fs.readFileSync(__dirname + '/../templates/schedule.ejs', 'utf8');

module.exports = Backbone.View.extend({
  className: 'o-content-block',

  initialize: function(options) {
    var _this = this;
    $.getJSON(window.app.apiURL + "/api/schedule/")
      .done((data) => {
        this.scheduleData = data;
        this.render();
      });
  },

  render: function render() {
    this.$el.html(_.template(template)({schedule: this.getSchedule()}));
    return this;
  },

  getSchedule: function getSchedule() {
    var parsedSchedule = [];
    if (!this.scheduleData) {
      return parsedSchedule;
    }
    var keys = _.keys(this.scheduleData);
    for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      var key = keys[keyIndex];
      var data = {
        shows: this.scheduleData[key]
      };
      if (data.shows.length) {
        data.heading = fecha.format(data.shows[0].start_time, 'dddd / MMMM D').toUpperCase();
        for (var i = 0; i < data.shows.length; i++) {
          var show = data.shows[i];
          var start = fecha.format(show.start_time, 'HHmm');
          var end = fecha.format(show.end_time, 'HHmm')
          show.scheduleTime = start + " - " + end;
        }
        parsedSchedule.push(data);
      }
    }
    parsedSchedule.sort(function(itemA, itemB) {
      console.log(itemA.shows.start_time - itemB.shows.start_time)
      return itemA.shows.start_time - itemB.shows.start_time;
    })
    return parsedSchedule;
  }
});
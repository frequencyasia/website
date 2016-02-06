'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var $ = require("jquery");
var fs = require("fs");
var fecha = require("fecha");
var template = fs.readFileSync(__dirname + '/../templates/schedule.ejs', 'utf8');

module.exports = Backbone.View.extend({
  className: 'o-content-block',

  render: function render() {
    this.$el.html(_.template(template)({schedule: this.parseSchedule()}));
    return this;
  },

  getSchedule: function getSchedule () {
    var _this = this;
    $.getJSON(window.app.airtimeURL + "/api/week-info")
      .done(function(data) {
        _this.scheduleData = data;
        _this.render();
      });
  },

  parseSchedule: function parseSchedule() {
    var parsedSchedule = [];
    if (!this.scheduleData) {
      return parsedSchedule;
    }
    delete this.scheduleData.AIRTIME_API_VERSION
    var keys = _.keys(this.scheduleData);
    for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      var key = keys[keyIndex];
      var data = {
        shows: this.scheduleData[key]
      };
      if (data.shows.length) {
        data.heading = fecha.format(fecha.parse(data.shows[0].start_timestamp, 'YYYY-MM-DD hh:mm:ss'), 'dddd / MMMM D').toUpperCase();
        for (var i = 0; i < data.shows.length; i++) {
          var show = data.shows[i];
          var start = fecha.format(fecha.parse(show.start_timestamp, 'YYYY-MM-DD hh:mm:ss'), 'HHmm');
          var end = fecha.format(fecha.parse(show.end_timestamp, 'YYYY-MM-DD hh:mm:ss'), 'HHmm')
          show.scheduleTime = start + " - " + end;
        }
        parsedSchedule.push(data);
      }
    }
    return parsedSchedule;
  }
});
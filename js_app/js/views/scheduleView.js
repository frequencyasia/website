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
    if (!this.scheduleData) {
      return {}
    }
    var parsedSchedule = [];
    var date = new Date();
    delete this.scheduleData.AIRTIME_API_VERSION
    var keys = _.keys(this.scheduleData);
    for (var keyIndex; keyIndex < keys.length; keyIndex++) {
      var key = keys[keyIndex];
      var data = {
        heading: fecha.format(date, 'dddd / MMMM D').toUpperCase(),
        shows: this.scheduleData[key]
      };
      for (var i = 0; i < data.shows.length; i++) {
        var show = data.shows[i];
        // The replace thing is a hack to get dates working in Safari.
        var start = fecha.format(fecha.parse(show.start_timestamp, 'YYYY-MM-DD hh:mm:ss'), 'HHmm');
        var end = fecha.format(fecha.parse(show.end_timestamp, 'YYYY-MM-DD hh:mm:ss'), 'HHmm')
        show.scheduleTime = start + " - " + end;
      }
      parsedSchedule.push(data);
      date = new Date(date.getTime() + 60 * 60 * 24 * 1000);
    }
    return parsedSchedule;
  }
});
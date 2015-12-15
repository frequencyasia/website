'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var fs = require("fs");
var $ = require("jquery");
var moment = require("moment");
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
    for (var key of _.keys(this.scheduleData)) {
      var data = {
        heading: moment(date).format('dddd, MMMM Do'),
        shows: this.scheduleData[key]
      };
      for (var show of data.shows) {
        var startTime = moment(show.start_timestamp);
        var endTime = moment(show.end_timestamp);
        show.scheduleTime = startTime.format('HH:mm') + " - " + endTime.format('HH:mm');
      }
      parsedSchedule.push(data);
      date = new Date(date.getTime() + 60 * 60 * 24 * 1000);
    }
    console.log(parsedSchedule);
    return parsedSchedule;
  }
});
'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var fs = require("fs");
var template = fs.readFileSync(__dirname + '/../templates/main.ejs', 'utf8');

module.exports = Backbone.View.extend({
  render: function render() {
    this.$el.html(_.template(template));
    return this;
  }
});
'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var fs = require("fs");
var $ = require("jquery");
var template = fs.readFileSync(__dirname + '/../templates/wiki.ejs', 'utf8');

module.exports = Backbone.View.extend({
  className: 'o-content-block',

  render: function render() {
    this.$el.html(_.template(template));
    return this;
  }
});
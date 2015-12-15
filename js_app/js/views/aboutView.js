'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var fs = require("fs");
var template = fs.readFileSync(__dirname + '/../templates/about.ejs', 'utf8');

module.exports = Backbone.View.extend({
  className: 'o-content-block',
  
  render: function render() {
    this.$el.html(_.template(template));
    return this;
  }
});
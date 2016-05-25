'use strict';

var Backbone = require('backbone');
import template from 'lodash/template';
var fs = require("fs");
var $ = require("jquery");

module.exports = Backbone.View.extend({
  className: 'o-content-block',
  template: fs.readFileSync(__dirname + '/../templates/about.ejs', 'utf8'),

  render: function render() {
    this.$el.html(template(this.template));
    return this;
  }
});

'use strict';

var Backbone = require('backbone');
import template from 'lodash/template';
var fs = require("fs");
var $ = require("jquery");

module.exports = Backbone.View.extend({
  template: fs.readFileSync(__dirname + '/../templates/projects.ejs', 'utf8'),
  className: 'o-content-block',

  render: function render() {
    this.$el.html(template(this.template));
    return this;
  },
});

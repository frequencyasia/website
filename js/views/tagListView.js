'use strict';

var Backbone = require('backbone');
import template from 'lodash/template';
var fs = require("fs");
var $ = require("jquery");

module.exports = Backbone.View.extend({
  template: fs.readFileSync(__dirname + '/../templates/tagList.ejs', 'utf8'),
  className: 'o-content-block',

  initialize: function(options) {
    this.tagType = options.type;
    if (this.tagType === 'artists') {
      this.tagTypePretty = "Artists";
    } else if (this.tagType === 'cities') {
      this.tagTypePretty = "Cities";
    } else {
      this.tagTypePretty = "Countries";
    }
    $.getJSON("/api/v1.0/" + this.tagType)
      .done((data) => {
        this.tagData = data.items;
        this.render();
        document.title = this.tagTypePretty + " | Frequency Asia";
      });
  },

  render: function render() {
    this.$el.html(template(this.template)({
      'type': this.tagType,
      'typePretty': this.tagTypePretty,
      'data': this.tagData,
    }));
    return this;
  },
});

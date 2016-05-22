'use strict';

var Backbone = require('backbone');
var _ = require("lodash");
var fs = require("fs");
var $ = require("jquery");
var template = fs.readFileSync(__dirname + '/../templates/tagList.ejs', 'utf8');

module.exports = Backbone.View.extend({
  className: 'o-content-block',

  initialize: function(options) {
    this.tagType = options.type;
    if (this.tagType === 'artist') {
      this.tagTypePretty = "Artists";
    } else if (this.tagType === 'city') {
      this.tagTypePretty = "Cities";
    } else {
      this.tagTypePretty = "Countries";
    }
    $.getJSON("/api/tags/" + this.tagType)
      .done((data) => {
        this.tagData = data;
        this.render();
        document.title = this.tagTypePretty + " | Frequency Asia";
      });
  },

  render: function render() {
    this.$el.html(_.template(template)({
      'type': this.tagType,
      'typePretty': this.tagTypePretty,
      'data': this.tagData,
    }));
    return this;
  }
});
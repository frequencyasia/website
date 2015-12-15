'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var MainView = require('./views/mainView');
var ShowListView = require('./views/showListView');
var ShowView = require('./views/showView');
var AboutView = require('./views/aboutView');
var ScheduleView = require('./views/scheduleView');

module.exports = Backbone.Router.extend({
	routes: {
    "": "loadMainView",
		"shows": "loadShowListView",
		"shows/:showSlug": "loadShowView",
		"about": "loadAboutView",
		"schedule": 'loadScheduleView'
	},
	currentView: null,

  loadMainView: function () {
    var view = new MainView();
		$("#main-container").html(view.render().el);
  },

	loadShowListView: function () {
		var view = new ShowListView();
		$("#main-container").html(view.render().el);
  },

	loadShowView: function (showSlug) {
		var view = new ShowView({
			slug: showSlug,
		});
		$("#main-container").html(view.render().el);
  },

	loadAboutView: function () {
		var view = new AboutView();
		$("#main-container").html(view.render().el);
  },

	loadScheduleView: function () {
		var view = new ScheduleView();
		$("#main-container").html(view.render().el);
		view.getSchedule();
  },

});
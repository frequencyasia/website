'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var MainView = require('./views/mainView');
var ShowListView = require('./views/showListView');
var ShowView = require('./views/showView');
var AboutView = require('./views/aboutView');
var ScheduleView = require('./views/scheduleView');
var ProjectsView = require('./views/projectsView');

module.exports = Backbone.Router.extend({
	routes: {
    "": "loadMainView",
		"shows": "loadShowListView",
		"shows/:showSlug": "loadShowView",
		"about": "loadAboutView",
		"schedule": 'loadScheduleView',
		"projects": 'loadProjectsView',
	},
	currentView: null,

	setTitle: function (title) {
		document.title = title;
	},

  loadMainView: function () {
    var view = new MainView();
		$("#main-container").html(view.render().el);
		view.getShowcaseItems();
		this.setTitle('Frequency Asia');
  },

	loadShowListView: function () {
		var view = new ShowListView();
		$("#main-container").html(view.render().el);
		this.setTitle('Shows | Frequency Asia');
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
		this.setTitle('About | Frequency Asia');
  },

	loadProjectsView: function () {
		var view = new ProjectsView();
		$("#main-container").html(view.render().el);
		this.setTitle('Projects | Frequency Asia');
  },

	loadScheduleView: function () {
		var view = new ScheduleView();
		$("#main-container").html(view.render().el);
		view.getSchedule();
		this.setTitle('Schedule | Frequency Asia');
  },

});
'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var MainView = require('./views/mainView');
var ShowListView = require('./views/showListView');
var ShowView = require('./views/showView');
var AboutView = require('./views/aboutView');
var ScheduleView = require('./views/scheduleView');
var ProjectsView = require('./views/projectsView');
var WikiView = require('./views/wikiView');
var TagView = require('./views/tagView');
var TagListView = require('./views/tagListView');

module.exports = Backbone.Router.extend({
	routes: {
    "": "loadMainView",
		"shows": "loadShowListView",
		"shows/:showSlug": "loadShowView",
		"shows/:showSlug/:episodeSlug": "loadShowView", // Currently just go to show page, until we have episode pages.
		"about": "loadAboutView",
		"schedule": 'loadScheduleView',
		"projects": 'loadProjectsView',
		"wiki": "loadWikiView",
		"wiki/artist": "loadArtistListView",
		"wiki/city": "loadCityListView",
		"wiki/country": "loadCountryListView",
		"wiki/artist/:artistSlug": "loadArtistView",
		"wiki/city/:citiesSlug": "loadCityView",
		"wiki/country/:countriesSlug": "loadCountryView",
	},
	currentView: null,

	track: function() {
      var url = Backbone.history.getFragment();

      // Add a slash if neccesary
      if (!/^\//.test(url)) url = '/' + url;

      // Record page view
      ga('send', {
          'hitType': 'pageview',
          'page': url
      });
  },

	setTitle: function (title) {
		document.title = title;
	},

  loadMainView: function () {
    var view = new MainView();
		$("#main-container").html(view.render().el);
		view.getShowcaseItems();
		this.setTitle('Frequency Asia');
		this.track();
  },

	loadShowListView: function () {
		var view = new ShowListView();
		$("#main-container").html(view.render().el);
		this.setTitle('Shows | Frequency Asia');
		this.track();
  },

	loadShowView: function (showSlug) {
		var view = new ShowView({
			slug: showSlug,
		});
		$("#main-container").html(view.render().el);
		this.track();
  },

	loadAboutView: function () {
		var view = new AboutView();
		$("#main-container").html(view.render().el);
		this.setTitle('About | Frequency Asia');
		this.track();
  },

	loadProjectsView: function () {
		var view = new ProjectsView();
		$("#main-container").html(view.render().el);
		this.setTitle('Projects | Frequency Asia');
		this.track();
  },

	loadScheduleView: function () {
		var view = new ScheduleView();
		$("#main-container").html(view.render().el);
		view.getSchedule();
		this.setTitle('Schedule | Frequency Asia');
		this.track();
  },

	loadWikiView: function() {
		var view = new WikiView();
		$("#main-container").html(view.render().el);
		this.setTitle('Wiki | Frequency Asia');
	},

	loadArtistView: function(slug) {
		var view = new TagView({
			type: 'artists',
			slug: slug,
		});
		$("#main-container").html(view.render().el);
	},

	loadCityView: function(slug) {
		var view = new TagView({
			type: 'cities',
			slug: slug,
		});
		$("#main-container").html(view.render().el);
	},

	loadCountryView: function(slug) {
		var view = new TagView({
			type: 'countries',
			slug: slug,
		});
		$("#main-container").html(view.render().el);
	},

	loadArtistListView: function() {
		var view = new TagListView({
			type: 'artists',
		});
		$("#main-container").html(view.render().el);
	},

	loadCountryListView: function() {
		var view = new TagListView({
			type: 'countries',
		});
		$("#main-container").html(view.render().el);
	},

	loadCityListView: function() {
		var view = new TagListView({
			type: 'cities',
		});
		$("#main-container").html(view.render().el);
	},
});
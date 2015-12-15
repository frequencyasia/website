var $ = require('jquery');
var Backbone = require('backbone');
var Router = require('./router');
var PlayerView = require('./views/playerView');
var NavView = require('./views/navView');

window.app = {
	apiURL: "http://beta.frequency.asia",
	airtimeURL: "http://airtime.frequency.asia",
	init: function () {
		console.log("init!!");
		this.views = {
			playerView: new PlayerView({
				el: $("#player-container"),
			}),
			navView: new NavView({
				el: $("#nav-container"),
			}),
		}
		this.views.playerView.render();
		this.views.navView.render();
		// Create and fire up the router
		this.router = new Router();
		this.router.on("route", function(route, params) {
		  window.app.views.navView.setActivePage();
		});
		Backbone.history.start();
	}
};

window.app.init();
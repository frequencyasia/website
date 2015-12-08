var $ = require('jquery');
var Backbone = require('backbone');
var Router = require('./router');
var PlayerView = require('./views/playerView');
var NavView = require('./views/navView');

window.app = {
	apiURL: "http://127.0.0.1:5000",
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
		Backbone.history.start();
	}
};

window.app.init();
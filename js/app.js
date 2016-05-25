// var Backbone = require('backbone');
// var $ = require("jquery");
// var Router = require('./router');
// var PlayerView = require('./views/playerView');
// var NavView = require('./views/navView');
//
// window.app = {
// 	airtimeURL: "http://airtime.frequency.asia",
// 	init: function () {
// 		this.views = {
// 			playerView: new PlayerView({
// 				el: $("#player-container"),
// 			}),
// 			navView: new NavView({
// 				el: $("#nav-container"),
// 			}),
// 		}
// 		this.views.playerView.render();
// 		this.views.navView.render();
// 		// Create and fire up the router
// 		this.router = new Router();
// 		this.router.on("route", function(route, params) {
// 		  window.app.views.navView.setActivePage();
// 		});
// 		Backbone.history.start();
// 	}
// };
//
// window.app.init();

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Route, Router, IndexRoute } from 'react-router';

import Home from './components/home';
import About from './components/about';
import Projects from './components/projects';
import Schedule from './components/schedule';
import Show from './components/show';
import ShowList from './components/showList';

console.log("Frequency Asia v1.1")

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/">
      <IndexRoute component={Home} />
			<Route path="about" component={About} />
			<Route path="projects" component={Projects} />
			<Route path="schedule" component={Schedule} />
      <Route path="shows">
				<IndexRoute component={ShowList} />
				<Route path=":showSlug">
					<IndexRoute component={Show} />
					<Route path=":episodeSlug" />
				</Route>
			</Route>
			<Route path="wiki">
			</Route>
    </Route>
  </Router>
), document.getElementById('main-container'));

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
import { Location, Locations, NotFound } from 'react-router-component';

import Home from './components/home';
import ArtistList from './components/artistList';
import Artist from './components/artist';
import About from './components/about';
import Nav from './components/nav';
import Player from './components/player';
import Projects from './components/projects';
import Schedule from './components/schedule';
import Show from './components/show';
import ShowList from './components/showList';
import Wiki from './components/wiki';

const NotFoundPage = React.createClass({
  render: function render() {
    return '404';
  },
});

const App = React.createClass({
  render: function render() {
    return (
    <Locations component={null}>
      <Location path="/" handler={Home} />
      <Location path="/about" handler={About} />
      <Location path="/projects" handler={Projects} />
      <Location path="/schedule" handler={Schedule} />
      <Location path="/shows" handler={ShowList} />
      <Location path="/shows/:slug" handler={Show} />
      <Location path="/shows/:slug/:episodeSlug" handler={Show} />
      <Location path="/wiki" handler={Wiki} />
      <Location path="/wiki/artists" handler={ArtistList} />
      <Location path="/wiki/artists/:slug" handler={Artist} />
      <Location path="/wiki/cities" handler={Wiki} />
      <Location path="/wiki/cities/:slug" handler={Wiki} />
      <Location path="/wiki/countries" handler={Wiki} />
      <Location path="/wiki/countries/:slug" handler={Wiki} />
      <Location path="/wiki/labels" handler={Wiki} />
      <Location path="/wiki/labels/:slug" handler={Wiki} />
      <NotFound handler={NotFoundPage} />
    </Locations>);
  },
});

ReactDOM.render((
  <Nav />
), document.getElementById('nav-container'));

ReactDOM.render((
  <Player />
), document.getElementById('player-container'));

ReactDOM.render((
  <App history />
), document.getElementById('main-container'));

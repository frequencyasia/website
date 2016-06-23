import React from 'react';
import ReactDOM from 'react-dom';
import { Location, Locations, NotFound } from 'react-router-component';

import About from './components/about';
import Artist from './components/wiki/artist';
import ArtistList from './components/wiki/artistList';
// import Chat from './components/chat/chat';
import City from './components/wiki/city';
import CityList from './components/wiki/cityList';
import Country from './components/wiki/country';
import CountryList from './components/wiki/countryList';
import Home from './components/home';
import Nav from './components/nav';
import NotFoundPage from './components/notFound';
import Player from './components/player/player';
import Projects from './components/projects';
import Schedule from './components/schedule';
import Show from './components/show';
import ShowList from './components/showList';
import Wiki from './components/wiki/wiki';

// Fix incoming hashed URLS
if (window.location.hash.length) {
  window.location.href = window.location.href.split('#')[0] + window.location.hash.slice(1, window.location.hash.length);
  window.location.hash = '';
}

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
      <Location path="/wiki/cities" handler={CityList} />
      <Location path="/wiki/cities/:slug" handler={City} />
      <Location path="/wiki/countries" handler={CountryList} />
      <Location path="/wiki/countries/:slug" handler={Country} />
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

// ReactDOM.render((
//   <Chat />
// ), document.getElementById('chat-container'));

console.log('Frequency Asia 1.1.0');
import React from 'react';
import ReactDOM from 'react-dom';
import { Location, Locations, NotFound } from 'react-router-component';

import Home from './components/home';
import ArtistList from './components/artistList';
import Artist from './components/artist';
import About from './components/about';
import Nav from './components/nav';
import NotFoundPage from './components/notFound';
import Player from './components/player/player';
import Projects from './components/projects';
import Schedule from './components/schedule';
import Show from './components/show';
import ShowList from './components/showList';
import Country from './components/country';
import CountryList from './components/countryList';
import City from './components/city';
import CityList from './components/cityList';
import Wiki from './components/wiki';


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

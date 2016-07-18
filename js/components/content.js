import React from 'react';
import { Location, Locations, NotFound } from 'react-router-component';

import About from './about';
import Artist from './wiki/artist';
import ArtistList from './wiki/artistList';
// import Chat from './chat/chat';
import City from './wiki/city';
import CityList from './wiki/cityList';
import Country from './wiki/country';
import CountryList from './wiki/countryList';
import Episode from './episode';
import Home from './home';
import NotFoundPage from './notFound';
import Projects from './projects';
import Schedule from './schedule';
import Show from './show';
import ShowList from './showList';
import Wiki from './wiki/wiki';

module.exports = React.createClass({
  render: function render() {
    return (
    <Locations component={null}>
      <Location path="/" handler={Home} />
      <Location path="/about" handler={About} />
      <Location path="/projects" handler={Projects} />
      <Location path="/schedule" handler={Schedule} />
      <Location path="/shows" handler={ShowList} />
      <Location path="/shows/:slug" handler={Show} />
      <Location path="/shows/:slug/:episodeSlug" handler={Episode} />
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

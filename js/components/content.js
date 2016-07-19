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
  propTypes: {
    nowPlayingSlug: React.PropTypes.string.isRequired,
  },

  render: function render() {
    return (
    <Locations component={null}>
      <Location path="/" handler={Home} nowPlayingSlug={ this.props.nowPlayingSlug }/>
      <Location path="/about" handler={About} />
      <Location path="/projects" handler={Projects} />
      <Location path="/schedule" handler={Schedule} />
      <Location path="/shows" handler={ShowList} />
      <Location path="/shows/:showSlug/:slug" handler={Episode} nowPlayingSlug={ this.props.nowPlayingSlug } />
      <Location path="/shows/:slug" handler={Show} nowPlayingSlug={ this.props.nowPlayingSlug } />
      <Location path="/wiki" handler={Wiki} />
      <Location path="/wiki/artists" handler={ArtistList} />
      <Location path="/wiki/artists/:slug" handler={Artist} nowPlayingSlug={ this.props.nowPlayingSlug } />
      <Location path="/wiki/cities" handler={CityList} />
      <Location path="/wiki/cities/:slug" handler={City} nowPlayingSlug={ this.props.nowPlayingSlug } />
      <Location path="/wiki/countries" handler={CountryList} />
      <Location path="/wiki/countries/:slug" handler={Country} nowPlayingSlug={ this.props.nowPlayingSlug } />
      <Location path="/wiki/labels" handler={Wiki} />
      <Location path="/wiki/labels/:slug" handler={Wiki} nowPlayingSlug={ this.props.nowPlayingSlug } />
      <NotFound handler={NotFoundPage} />
    </Locations>);
  },
});

import React from 'react';
import $ from 'jquery';
import fecha from 'fecha';
import i18next from 'i18next';

import Constants from './../../constants';
import EpisodeCard from './../episodeCard';
import { Link } from 'react-router-component';

module.exports = React.createClass({

  propTypes: {
    slug: React.PropTypes.string.isRequired,
  },

  getInitialState: function getInitialState() {
    return {
      name: '',
      episodes: [],
    };
  },

  componentDidMount: function componentDidMount() {
    document.title = `${i18next.t('city')} | ${i18next.t('freqAsia')}`;
    $.getJSON(Constants.API_URL + 'cities/' + this.props.slug)
      .done((data) => {
        data.episodes.forEach((episode) => {
          episode.date = fecha.format(new Date(episode.start_time), 'dddd / MMMM D YYYY');
        });
        this.setState({
          name: data.name,
          episodes: data.episodes,
        });
        document.title = `${data.name} | ${i18next.t('freqAsia')}`;
      });
  },

  renderEpisodeCards: function renderEpisodeCards() {
    return this.state.episodes.map((episode) => {
      return <EpisodeCard key={ episode.slug } { ...episode } />;
    });
  },

  render: function render() {
    return (
      <div className="o-content-block">
      <section className="c-content">
        <div className="row">
          <div className="col">
            <h1><Link className="u-no-border" href="/wiki">{ i18next.t('wiki') }</Link> &rsaquo; <Link className="u-no-border" href="/wiki/cities">{ i18next.t('cities') }</Link> &rsaquo; { this.state.name }</h1>
            <h2 id="location-data"></h2>
            { this.renderEpisodeCards() }
          </div>
        </div>
      </section>
      </div>
    );
  },
});

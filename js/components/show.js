import React from 'react';
import $ from 'jquery';
import fecha from 'fecha';

import Constants from './../constants';
import EpisodeCard from './episodeCard';

module.exports = React.createClass({

  propTypes: {
    slug: React.PropTypes.string.isRequired,
  },

  getInitialState: function getInitialState() {
    return {
      name: '',
      image_path: 'placeholder.png',
      description: '',
      episodes: [],
    };
  },

  componentDidMount: function componentDidMount() {
    document.title = 'Show | Frequency Asia';
    $.getJSON(Constants.API_URL + 'shows/' + this.props.slug)
      .done((data) => {
        for (let i = 0; i < data.episodes.length; i++) {
          const item = data.episodes[i];
          item.date = fecha.format(new Date(item.start_time), 'dddd / MMMM D YYYY');
        }
        this.setState(data);
        document.title = this.state.name + ' | Frequency Asia';
      });
  },

  renderSidebar: function renderSidebar() {
    const style = { backgroundImage: `url(/static/files/${this.state.image_path})` };
    return (
      <aside className="c-show__sidebar">
        <div className="c-show__sidebar__image" style={ style }></div>
        <h1 className="c-show__sidebar__title">{ this.state.name }</h1>
        <div dangerouslySetInnerHTML={ { __html: this.state.description } } />
      </aside>
    );
  },

  renderEpisodeCards: function renderEpisodeCards() {
    return this.state.episodes.map((episode) => {
      return <EpisodeCard key={ episode.slug } { ...episode } />;
    });
  },

  render: function render() {
    return (
      <section className="c-show">
        { this.renderSidebar() }
        <section className="c-show__episodes">{ this.renderEpisodeCards() }</section>
      </section>
    );
  },
});

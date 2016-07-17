import React from 'react';
import $ from 'jquery';
import i18next from 'i18next';

import Constants from './../constants';
import ShowThumbnail from './showThumbnail';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return {
      shows: [],
    };
  },

  componentDidMount: function componentDidMount() {
    document.title = `${i18next.t('shows')} | ${i18next.t('freqAsia')}`;
    $.getJSON(Constants.API_URL + 'shows')
      .done((data) => {
        this.setState({ shows: data.shows });
      });
  },

  render: function render() {
    return (
      <section className="o-content-block u-full-width-mobile">
        { this.state.shows.map((show) => { return <ShowThumbnail key={ show.slug } { ...show } />; }) }
      </section>
    );
  },
});

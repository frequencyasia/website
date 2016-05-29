import React from 'react';
import $ from 'jquery';

import Constants from './../constants';
import ShowThumbnail from './showThumbnail';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return {
      shows: [],
    };
  },

  componentWillMount: function componentWillMount() {
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

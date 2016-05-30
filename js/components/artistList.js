import React from 'react';
import $ from 'jquery';

import Constants from './../constants';
import { Link } from 'react-router-component';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return {
      artists: [],
    };
  },

  componentWillMount: function componentWillMount() {
    $.getJSON(Constants.API_URL + 'artists')
      .done((data) => {
        this.setState({ artists: data.items });
      });
  },

  render: function render() {
    return (
      <div className="o-content-block">
        <section className="c-content">
          <div className="row">
            <div className="col">
              <h1><a className="u-no-border" href="/wiki">Wiki</a> &rsaquo; Artists</h1>
              <ul>
                { this.state.shows.map((artist) => {
                  const link = '/wiki/artists/' + artist.slug;
                  return <li className="c-wiki__list__item"><Link href={ link }>{ artist.name }</Link></li>;
                }) }
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  },
});

import React from 'react';
import $ from 'jquery';

import Constants from './../constants';
import { Link } from 'react-router-component';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return {
      cities: [],
    };
  },

  componentWillMount: function componentWillMount() {
    $.getJSON(Constants.API_URL + 'cities')
      .done((data) => {
        this.setState({ cities: data.items });
      });
  },

  render: function render() {
    return (
      <div className="o-content-block">
        <section className="c-content">
          <div className="row">
            <div className="col">
              <h1><a className="u-no-border" href="/wiki">Wiki</a> &rsaquo; Cities</h1>
              <ul>
                { this.state.cities.map((city) => {
                  const link = '/wiki/cities/' + city.slug;
                  return <li className="c-wiki__list__item"><Link href={ link }>{ city.name }</Link></li>;
                }) }
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  },
});

import React from 'react';
import $ from 'jquery';

import Constants from './../constants';
import { Link } from 'react-router-component';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return {
      countries: [],
    };
  },

  componentWillMount: function componentWillMount() {
    $.getJSON(Constants.API_URL + 'countries')
      .done((data) => {
        this.setState({ countries: data.items });
      });
  },

  render: function render() {
    return (
      <div className="o-content-block">
        <section className="c-content">
          <div className="row">
            <div className="col">
              <h1><a className="u-no-border" href="/wiki">Wiki</a> &rsaquo; Countries</h1>
              <ul>
                { this.state.countries.map((country) => {
                  const link = '/wiki/countries/' + country.slug;
                  return <li className="c-wiki__list__item"><Link href={ link }>{ country.name }</Link></li>;
                }) }
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  },
});

import React from 'react';
import { Link } from 'react-router-component';
import $ from 'jquery';

import TagList from './tagList';
import Constants from './../../constants';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return { tags: [] };
  },

  componentDidMount: function componentDidMount() {
    document.title = 'Artists | Frequency Asia';
    $.getJSON(Constants.API_URL + 'artists')
      .done((data) => {
        this.setState({ tags: data.items });
      });
  },

  render: function render() {
    return (
      <div className="o-content-block">
        <section className="c-content">
          <div className="row">
            <div className="col">
              <h1><Link className="u-no-border" href="/wiki">Wiki</Link> &rsaquo; Artists</h1>
              <TagList type="artists" useTabs />
            </div>
          </div>
        </section>
      </div>
    );
  },
});

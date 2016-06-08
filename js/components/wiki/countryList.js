import React from 'react';
import { Link } from 'react-router-component';

import TagList from './tagList';

module.exports = React.createClass({

  componentDidMount: function componentDidMount() {
    document.title = 'Countries | Frequency Asia';
  },

  render: function render() {
    return (
      <div className="o-content-block">
        <section className="c-content">
          <div className="row">
            <div className="col">
              <h1><Link className="u-no-border" href="/wiki">Wiki</Link> &rsaquo; Countries</h1>
              <TagList type="countries" />
            </div>
          </div>
        </section>
      </div>
    );
  },
});

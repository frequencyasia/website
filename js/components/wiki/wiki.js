import React from 'react';
import { Link } from 'react-router-component';

module.exports = React.createClass({
  render: function render() {
    return (
      <div className="o-content-block">
        <section className="c-content">
          <div className="row">
            <div className="col">
              <h1>Wiki</h1>
              <ul>
                <li className="c-wiki__list__item"><Link href="/wiki/artists">Artists</Link></li>
                <li className="c-wiki__list__item"><Link href="/wiki/cities">Cities</Link></li>
                <li className="c-wiki__list__item"><Link href="/wiki/countries">Countries</Link></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  },
});

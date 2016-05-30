import React from 'react';

module.exports = React.createClass({
  render: function render() {
    return (
      <div className="o-content-block">
        <section className="c-content">
          <div className="row">
            <div className="col">
              <h1>Wiki</h1>
              <ul>
                <li className="c-wiki__list__item"><a href="/wiki/artists">Artists</a></li>
                <li className="c-wiki__list__item"><a href="/wiki/cities">Cities</a></li>
                <li className="c-wiki__list__item"><a href="/wiki/countries">Countries</a></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  },
});

import React from 'react';
import { Link } from 'react-router-component';
import i18next from 'i18next';

module.exports = React.createClass({

  componentDidMount: function componentDidMount() {
    document.title = `${i18next.t('wiki')} | ${i18next.t('freqAsia')}`;
  },

  render: function render() {
    return (
      <div className="o-content-block">
        <section className="c-content">
          <div className="row">
            <div className="col">
              <h1>{ i18next.t('wiki') }</h1>
              <ul>
                <li className="c-wiki__list__item"><Link href="/wiki/artists">{ i18next.t('artists') }</Link></li>
                <li className="c-wiki__list__item"><Link href="/wiki/cities">{ i18next.t('cities') }</Link></li>
                <li className="c-wiki__list__item"><Link href="/wiki/countries">{ i18next.t('countries') }</Link></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  },
});

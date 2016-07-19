import React from 'react';
import { Link } from 'react-router-component';
import i18next from 'i18next';

module.exports = React.createClass({
  propTypes: {
    nowPlayingUrl: React.PropTypes.string.isRequired,
    currentSection: React.PropTypes.string.isRequired,
  },

  isSelected: function isSelected(path) {
    // Return appropriate class if given link is the current route.
    if (this.props.currentSection === path) {
      return 'c-nav__item--active';
    }
  },

  renderLink: function renderLink(url, label) {
    let className = 'c-nav__item';
    if (this.isSelected(label)) {
      className += ' c-nav__item--active';
    }
    return (
      <Link href={ url }>
        <div className={ className }>{ i18next.t(label).toLowerCase() }</div>
      </Link>
    );
  },

  render: function render() {
    let nowPlayingLabel = 'home';
    if (this.props.nowPlayingUrl !== '/') {
      nowPlayingLabel = 'nowPlaying';
    }
    return (
      <nav className="c-nav c-header__content" role="navigation">
        <Link className="u-no-border u-no-padding" href="/"><div className="c-header__content__logo">{ i18next.t('home').toLowerCase() }</div></Link>
        { this.renderLink(this.props.nowPlayingUrl, nowPlayingLabel) }
        { this.renderLink('/shows', 'shows') }
        { this.renderLink('/schedule', 'schedule') }
        { this.renderLink('/wiki', 'wiki') }
        { this.renderLink('/projects', 'projects') }
        { this.renderLink('/about', 'about') }
      </nav>
    );
  },
});

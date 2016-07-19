import React from 'react';
import { Link } from 'react-router-component';
import i18next from 'i18next';

module.exports = React.createClass({
  propTypes: {
    nowPlayingUrl: React.PropTypes.string.isRequired,
  },

  isSelected: function isSelected(path) {
    // Return appropriate class if given link is the current route.
    console.log(window.location)
    if (path === 'nowPlaying' && window.location.pathname === 'nowPlayingUrl') {
      return 'c-nav__item--active';
    } else if (window.location.pathname !== 'nowPlayingUrl') { // Need this condition because show and nowplaying will both match otherwise.
      const pathArray = window.location.pathname.split('/');
      if (pathArray[0] === path) {
        return 'c-nav__item--active';
      }
    }
  },

  render: function render() {
    let nowPlayingLabel = i18next.t('home').toLowerCase();
    if (this.props.nowPlayingUrl !== '/') {
      nowPlayingLabel = i18next.t('nowPlaying').toLowerCase();
    }
    return (
      <nav className="c-nav c-header__content" role="navigation">
        <Link className="u-no-border u-no-padding" href="/"><div className="c-header__content__logo">{ i18next.t('home').toLowerCase() }</div></Link>
        <Link href={ this.props.nowPlayingUrl } ><div className="c-nav__item {this.isSelected('nowPlaying')}">{ nowPlayingLabel }</div></Link>
        <Link href="/shows"><div className="c-nav__item {this.isSelected('shows')}">{ i18next.t('shows').toLowerCase() }</div></Link>
        <Link href="/schedule"><div className="c-nav__item {this.isSelected('schedule')}">{ i18next.t('schedule').toLowerCase() }</div></Link>
        <Link href="/wiki"><div className="c-nav__item {this.isSelected('wiki')}">{ i18next.t('wiki').toLowerCase() }</div></Link>
        <Link href="/projects"><div className="c-nav__item {this.isSelected('projects')}">{ i18next.t('projects').toLowerCase() }</div></Link>
        <Link href="/about"><div className="c-nav__item {this.isSelected('about')}">{ i18next.t('about').toLowerCase() }</div></Link>
      </nav>
    );
  },
});

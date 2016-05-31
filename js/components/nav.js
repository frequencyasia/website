import React from 'react';
import { Link } from 'react-router-component';
import PubSub from 'pubsub-js';

import Constants from './../constants';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return { nowPlayingUrl: '/' };
  },

  setNowPlayingURL: function setNowPlayingURL(pubSubLabel, url) {
    if (pubSubLabel === Constants.PUB_SUB_LABEL.NOW_PLAYING_URL) {
      this.setState({ nowPlayingUrl: url });
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    PubSub.unsubscribe(this.nowPlayingPubSubToken);
  },

  componentDidMount: function componentDidMount() {
    this.nowPlayingPubSubToken = PubSub.subscribe(Constants.PUB_SUB_LABEL.NOW_PLAYING_URL, this.setNowPlayingURL);
  },

  render: function render() {
    let nowPlayingLabel = 'home';
    if (this.state.nowPlayingUrl !== '/') {
      nowPlayingLabel = 'now playing';
    }
    return (
      <nav className="c-nav" role="navigation">
        <Link href={ this.state.nowPlayingUrl } ><div className="c-nav__item">{ nowPlayingLabel }</div></Link>
        <Link href="/shows"><div className="c-nav__item">shows</div></Link>
        <Link href="/schedule"><div className="c-nav__item">schedule</div></Link>
        <Link href="/wiki"><div className="c-nav__item">wiki</div></Link>
        <Link href="/projects"><div className="c-nav__item">projects</div></Link>
        <Link href="/about"><div className="c-nav__item">about</div></Link>
      </nav>
    );
  },
});

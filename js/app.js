import React from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import PubSub from 'pubsub-js';

import Constants from './constants';
import Chat from './components/chat/chat';
import Nav from './components/nav';
import Player from './components/player/player';
import Content from './components/content';

// Fix incoming hashed URLS
if (window.location.hash.length) {
  window.location.href = window.location.href.split('#')[0] + window.location.hash.slice(1, window.location.hash.length);
  window.location.hash = '';
}

// Initialise i18n
i18next.init({
  lng: 'en',
  resources: {
    en: require('./i18n/en-uk'),
  },
});

const App = React.createClass({
  getInitialState: function getInitialState() {
    return {
      nowPlayingUrl: '/',
      nowPlayingLabel: '',
      nowPlayingSlug: '',
      selectedMixcloudLink: '', // Empty string to denote no Mixcloud show selected.
      currentSection: '',
    };
  },

  componentDidMount: function componentDidMount() {
    this.mixcloudPubSubToken = PubSub.subscribe(Constants.PUB_SUB_LABEL.MIXCLOUD_URL, this.setMixcloudURL);
    this.nowPlayingPubSubToken = PubSub.subscribe(Constants.PUB_SUB_LABEL.NOW_PLAYING_INFO, this.setNowPlayingInfo);
  },

  componentWillUnmount: function componentWillUnmount() {
    PubSub.unsubscribe(this.mixcloudPubSubToken);
    PubSub.unsubscribe(this.nowPlayingPubSubToken);
  },

  setCurrentSection: function setCurrentSection() {
    // Set current section to match the appropriate url.
    const pathNames = window.location.pathname.split('/');
    if (window.location === this.state.nowPlayingUrl) {
      this.setState({ currentSection: 'nowPlaying' });
    } else if (pathNames.length > 1) {
      this.setState({ currentSection: pathNames[1] });
    }
  },

  setMixcloudURL: function setMixcloudURL(pubSubLabel, url) {
    if (pubSubLabel === Constants.PUB_SUB_LABEL.MIXCLOUD_URL) {
      this.setState({ selectedMixcloudLink: url });
    }
  },

  setNowPlayingInfo: function setNowPlayingInfo(pubSubLabel, info) {
    if (pubSubLabel === Constants.PUB_SUB_LABEL.NOW_PLAYING_INFO) {
      this.setState({
        nowPlayingUrl: info.link,
        nowPlayingLabel: info.label,
        nowPlayingSlug: info.slug,
      });
    }
  },

  render: function render() {
    return (
      <div>
        <header className="c-header" role="banner">
          <Nav nowPlayingUrl={ this.state.nowPlayingUrl } currentSection={ this.state.currentSection }/>
          <Player { ...this.state }/>
        </header>
        <main className="c-container" role="main">
          <Content history nowPlayingSlug={ this.state.nowPlayingSlug } setCurrentSection={ this.setCurrentSection }/>
        </main>
        <Chat id="chat-container" className="c-chat" />
        <aside className="c-social u-mobile-hidden">
          <a href="/shows.atom"><span className="c-social__icon icon-rss-square"></span></a>
          <a target="_blank" href="http://www.facebook.com/freqasia"><span className="c-social__icon icon-facebook-square"></span></a>
          <a target="_blank" href="http://www.twitter.com/freqasia"><span className="c-social__icon icon-twitter-square"></span></a>
          <a target="_blank" href="https://www.instagram.com/freqasia/"><span className="c-social__icon icon-instagram"></span></a>
          <a target="_blank" href="http://www.mixcloud.com/frequencyasia"><span className="c-social__icon icon-mixcloud"></span></a>
        </aside>
      </div>
    );
  },
});

ReactDOM.render((
  <App />
), document.getElementById('app-container'));


const pjson = require('./../package.json');
console.log('Frequency Asia ' + pjson.version);

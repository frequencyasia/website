import React from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import { Link } from 'react-router-component';
import fecha from 'fecha';

import Constants from './../../constants';
import MixcloudEmbed from './mixcloudEmbed'
import VolumeControl from './volumeControl';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return {
      isPlayingStream: typeof window.orientation === 'undefined', // Should return true if not mobile
      nowPlayingLabel: Constants.LABELS.OFFLINE,
      nowPlayingLink: '',
      selectedMixcloudLink: '', // Empty string to denote no Mixcloud show selected.
      volume: 8, // Max 10
    };
  },

  componentWillUnmount: function componentWillUnmount() {
    PubSub.unsubscribe(this.mixcloudPubSubToken);
  },

  componentDidMount: function componentDidMount() {
    this.mixcloudPubSubToken = PubSub.subscribe(Constants.PUB_SUB_LABEL.MIXCLOUD_URL, this.setMixcloudURL);
    this.setPlayerState();
    this.getNowPlaying();
  },

  componentDidUpdate: function componentDidUpdate() {
    this.setPlayerState();
  },

  onPlayClicked: function onPlayClicked() {
    this.setState({ isPlayingStream: !this.state.isPlayingStream });
  },

  setMixcloudURL: function setMixcloudURL(pubSubLabel, url) {
    if (pubSubLabel === Constants.PUB_SUB_LABEL.MIXCLOUD_URL) {
      this.setState({ selectedMixcloudLink: url });
    }
  },

  setVolume: function setVolume(volume) {
    this.setState({ volume });
    // Need to explicitly set volume because react cant handle the Audio well.
    const stream = document.getElementById('stream-player');
    stream.volume = volume / 10;
  },

  setPlayerState: function setPlayerState() {
    const stream = document.getElementById('stream-player');
    if (!this.state.isPlayingStream) {
      stream.pause();
    } else {
      stream.play();
    }
  },

  clearMixcloud: function clearMixcloud() {
    this.setState({ selectedMixcloudLink: '' });
  },

  getNowPlaying: function getNowPlaying() {
    $.getJSON(Constants.LIVE_INFO_URL)
      .done((data) => {
        if (data && data.current && data.current.name) {
          let [name, url] = data.current.name.split('|');
          const [_creatorName, showName] = name.split('-'); // Remove leading show name from Airtime.
          url = url.replace('#', '/'); // NOTE: Temp. fix for fact that url schema is different in react and airtime expects old schema.
          this.setState({
            nowPlayingLabel: showName.trim(),
            nowPlayingLink: url === undefined ? '' : url.trim(), // Return '' if no url.
          });
          PubSub.publish(Constants.PUB_SUB_LABEL.NOW_PLAYING_URL, this.state.nowPlayingLink); // Push url to Nav
        } else {
          this.setState({
            nowPlayingLabel: 'Offline',
            nowPlayingLink: '',
          });
        }
        if (data && data.next && data.next.starts) {
          const time = data.next.starts.split('.'); // Get rid of the ms because they're hard to parse.
          const endTime = fecha.parse(time[0], 'YYYY-MM-DD HH:mm:ss');
          const endTimestamp = endTime.getTime() + (8 * 60 * 60 * 1000) + 1000; // Add hours to get timezone right, plus 1 second to account for those milliseconds we reomved before.
          const now = new Date().getTime();
          const diff = endTimestamp - now;
          window.setTimeout(this.getNowPlaying, diff);
        }
      });
  },

  renderMetadata: function renderMetadata() {
    return (
      <p className="c-player__text">
        <Link href={ this.state.nowPlayingLink }>{ this.state.nowPlayingLabel }</ Link>
      </p>
    );
  },

  renderStream: function renderStream() {
    const audioButtonClass = this.state.isPlayingStream ? 'icon-pause2' : 'icon-play3';
    return (
      <div className="c-player">
        <audio id="stream-player" src="http://airtime.frequency.asia:8000/airtime_128" volume={ this.state.volume / 10 }></audio>
        <button id="play-stream" className="c-player__button" onClick={ this.onPlayClicked }>
          <span className={ audioButtonClass }></span>
        </button>
        { this.renderMetadata() }
        <VolumeControl volume={ this.state.volume } setVolume={ this.setVolume } />
      </div>
    );
  },

  render: function render() {
    if (this.state.selectedMixcloudLink && this.state.selectedMixcloudLink.length) {
      return <MixcloudEmbed onBackClicked={ this.clearMixcloud } link={ this.state.selectedMixcloudLink }/>
    }
    return this.renderStream();
  },
});

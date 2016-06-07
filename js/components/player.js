import React from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import { Link } from 'react-router-component';
import fecha from 'fecha';

import Constants from './../constants';
import VolumeControl from './volumeControl';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return {
      isPlayingStream: typeof window.orientation === 'undefined', // Should return true if not mobile
      nowPlayingLabel: 'Offline',
      nowPlayingLink: '',
      selectedMixcloudLink: '', // Empty string to denote no Mixcloud show selected.
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
        <audio id="stream-player" src="http://airtime.frequency.asia:8000/airtime_128"></audio>
        <button id="play-stream" className="c-player__button" onClick={ this.onPlayClicked }>
          <span className={ audioButtonClass }></span>
        </button>
        { this.renderMetadata() }
        <VolumeControl className="c-player__volume" />
      </div>
    );
  },

  renderMixcloud: function renderMixcloud() {
    const url = 'https://www.mixcloud.com/widget/iframe/?autoplay=1&amp;embed_type=widget_standard&amp;embed_uuid=99755eaf-a63a-4a7d-af25-efbb86e6480b&amp;feed=' + this.state.selectedMixcloudLink + ';hide_cover=1&amp;hide_tracklist=1&amp;light=0&amp;mini=1&amp;replace=0';
    return (
      <div className="c-player">
        <button className="c-player__button" onClick={ this.clearMixcloud }>
          <span className="icon-arrow-back"></span>
        </button>
        <iframe width="100%" height="60" src={ url } frameBorder="0"></iframe>
      </div>
    );
  },

  render: function render() {
    if (this.state.selectedMixcloudLink && this.state.selectedMixcloudLink.length) {
      return this.renderMixcloud();
    }
    return this.renderStream();
  },
});

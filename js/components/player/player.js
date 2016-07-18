import React from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import { Link } from 'react-router-component';
import fecha from 'fecha';

import Constants from './../../constants';
import MixcloudEmbed from './mixcloudEmbed';
import VolumeControl from './volumeControl';
import Utils from './../../utils';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return {
      isPlayingStream: typeof window.orientation === 'undefined', // Should return true if not mobile
      volume: 8, // Max 10
    };
  },
  componentDidMount: function componentDidMount() {
    this.setPlayerState();
    this.getNowPlaying();
  },

  componentDidUpdate: function componentDidUpdate() {
    this.setPlayerState();
  },

  onPlayClicked: function onPlayClicked() {
    this.setState({ isPlayingStream: !this.state.isPlayingStream });
  },

  setVolume: function setVolume(volume) {
    this.setState({ volume });
    // Need to explicitly set volume because react cant handle the Audio well.
    const stream = document.getElementById('stream-player');
    stream.volume = volume / 10;
  },

  setPlayerState: function setPlayerState() {
    const stream = document.getElementById('stream-player');
    if (stream) {
      if (!this.state.isPlayingStream) {
        stream.pause();
      } else {
        stream.play();
      }
    }
  },

  clearMixcloud: function clearMixcloud() {
    PubSub.publish(Constants.PUB_SUB_LABEL.MIXCLOUD_URL, '');
  },

  getNowPlaying: function getNowPlaying() {
    $.getJSON(Constants.LIVE_INFO_URL)
      .done((data) => {
        if (data && data.current && data.current.name) {
          let [name, url] = data.current.name.split('|');
          const splits = name.split('-'); // Remove leading show name from Airtime.
          splits.shift();
          const showName = splits.join('-');
          url = url.replace('#', ''); // NOTE: Temp. fix for fact that url schema is different in react and airtime expects old schema.
          PubSub.publish(Constants.PUB_SUB_LABEL.NOW_PLAYING_INFO, {
            label: Utils.escapeHtml(showName.trim()),
            link: url === undefined ? '' : url.trim(), // Return '' if no url.
            slug: '',
          });
        } else {
          PubSub.publish(Constants.PUB_SUB_LABEL.NOW_PLAYING_INFO, {
            label: Constants.LABELS.OFFLINE,
            link: '',
            slug: '',
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
        <Link href={ this.props.nowPlayingLink }>{ this.props.nowPlayingLabel }</ Link>
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
    if (this.props.selectedMixcloudLink && this.props.selectedMixcloudLink.length) {
      return <MixcloudEmbed onBackClicked={ this.clearMixcloud } link={ this.props.selectedMixcloudLink }/>;
    }
    return this.renderStream();
  },
});

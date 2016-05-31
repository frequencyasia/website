import React from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import Constants from './../constants';

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
    this.mixcloudPubSubToken = PubSub.subscribe('MIXCLOUD_URL', this.setMixcloudURL);
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
    if (pubSubLabel === 'MIXCLOUD_URL') {
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
          const [name, url] = data.current.name.split('|');
          this.setState({
            nowPlayingLabel: name.trim(),
            nowPlayingLink: url === undefined ? '' : url.trim(), // Return '' if no url.
          });
        } else {
          this.setState({
            nowPlayingLabel: 'Offline',
            nowPlayingLink: '',
          });
        }
        if (data && data.next && data.next.starts) {
          // var time = data.next.starts.split('.'); // Get rid of the ms because they're hard to parse.
          // var endTime = fecha.parse(time[0], "YYYY-MM-DD HH:mm:ss");
          // var endTimestamp = endTime.getTime() + (8 * 60 * 60 * 1000) + 1000; // Add hours to get timezone right, plus 1 second to account for those milliseconds we reomved before.
          // var now = new Date().getTime();
          // var diff = endTimestamp - now;
          // window.setTimeout(getNowPlaying, diff);
        }
      });
  },

  renderStream: function renderStream() {
    const audioButtonClass = this.state.isPlayingStream ? 'icon-pause2' : 'icon-play3';
    return (
      <div className="c-player">
        <audio id="stream-player" src="http://airtime.frequency.asia:8000/airtime_128"></audio>
        <button id="play-stream" className="c-player__button" onClick={ this.onPlayClicked }>
          <span className={ audioButtonClass }></span>
        </button>
        <p className="c-player__text">{ this.state.nowPlayingLabel }</p>
        <div className="c-player__volume">
          <input type="range" value="8" data-steps="10" id="volume-slider" />
        </div>
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

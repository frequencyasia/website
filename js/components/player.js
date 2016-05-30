import React from 'react';

module.exports = React.createClass({
  getInitialState: function getInitialState() {
    return {
      isPlayingStream: typeof window.orientation === 'undefined', // Should return true if not mobile
      nowPlayingLabel: 'Offline',
    };
  },

  setPlayerState: function setPlayerState() {
    const stream = document.getElementById('stream-player');
    if (!this.state.isPlayingStream) {
      stream.pause();
    } else {
      stream.play();
    }
  },

  componentDidMount: function componentDidMount() {
    this.setPlayerState();
  },

  componentDidUpdate: function componentDidUpdate() {
    this.setPlayerState();
  },

  render: function render() {
    const audioButtonClass = this.state.isPlayingStream ? 'icon-play3' : 'icon-pause2';
    return (
      <div className="c-player">
        <audio id="stream-player" src="http://airtime.frequency.asia:8000/airtime_128"></audio>
        <button id="play-stream" className="c-player__button">
          <span className={ audioButtonClass }></span>
        </button>
        <p className="c-player__text">{ this.state.nowPlayingLabel }</p>
        <div className="c-player__volume">
          <input type="range" value="8" data-steps="10" id="volume-slider" />
        </div>
      </div>
    );
  },
});

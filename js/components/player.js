import React from 'react';

module.exports = React.createClass({
  render: function render() {
    return (
      <div>
        <audio id="stream-player" src="http://airtime.frequency.asia:8000/airtime_128"></audio>
        <button id="play-stream" className="c-player__button">
          <span className="icon-play3 js-stream-status"></span>
        </button>
        <p className="js-stream-text c-player__text"></p>
        <div className="c-player__volume">
          <input type="range" value="8" data-steps="10" id="volume-slider" />
        </div>
      </div>
    );
  },
});

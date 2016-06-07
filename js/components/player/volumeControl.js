import React from 'react';

import VolumeTick from './volumeTick';

module.exports = React.createClass({

  renderSliderTicks: function renderSliderTicks() {
    return [1,2,3,4,5,6,7,8,9,10].map((i) => {
      return (<VolumeTick value={ i } volume={ this.props.volume } setVolume={ this.props.setVolume } />);
    });
  },

  renderARIASlider: function renderARIASlider() {
    return (
      <input
        type="range"
        value={ this.props.volume }
        style={{ display: 'none' }}
        aria-valuemin="0"
        aria-valuemax="10"
        aria-valuenow={ this.props.volume }
      />
    );
  },

  render: function render() {
    return (
      <aside className="c-player__volume">
        <div className="vslider">
          { this.renderARIASlider() }
          <div className="vslider_bar"></div>
          <ul className="vslider_sticks">
            { this.renderSliderTicks() }
          </ul>
        </div>
      </aside>
    );
  },
});

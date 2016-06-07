import React from 'react';

import VolumeTick from './volumeTick';

module.exports = React.createClass({

  renderSliderTicks: function renderSliderTicks() {
    // Render 10 ticks for the volume slider.
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
      return (<VolumeTick value={ i } volume={ this.props.volume } setVolume={ this.props.setVolume } />);
    });
  },

  onARIASliderChange: function onARIASliderChange(event) {
    this.props.setVolume(event.target.value);
  },

  renderARIASlider: function renderARIASlider() {
    // Render a hidden range input to be used for ARIA input.
    return (
      <input
        type="range"
        value={ this.props.volume }
        style={{ display: 'none' }}
        aria-valuemin="0"
        aria-valuemax="10"
        aria-valuenow={ this.props.volume }
        onChange={ this.onARIASliderChange }
      />
    );
  },

  render: function render() {
    return (
      <aside className="c-player__volume" aria-hidden>
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

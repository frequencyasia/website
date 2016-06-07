import React from 'react';

import VolumeTick from './volumeTick';

module.exports = React.createClass({

  renderSliderTicks: function renderSliderTicks() {
    return [1,2,3,4,5,6,7,8,9,10].map((i) => {
      return (<VolumeTick value={ i } volume={ this.props.volume } />);
    });
  },

  render: function render() {
    return (
      <aside className="c-player__volume">
        <div className="vslider">
          <input type="range" value={ this.props.volume } style={{ display: 'none' }} />
          <div className="vslider_bar"></div>
          <ul className="vslider_sticks">
            { this.renderSliderTicks() }
          </ul>
        </div>
      </aside>
    );
  },
});

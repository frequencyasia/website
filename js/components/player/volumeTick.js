import React from 'react';

module.exports = React.createClass({
  onMouseEnter: function onMouseEnter(event) {
    // Set volume to this value if mouse is down on enter.
    if (event.nativeEvent.which === 1) {
      this.props.setVolume(this.props.value);
    }
  },

  onMouseLeave: function onMouseLeave(event) {
    // Set volume to 0 if this is the first tick and mouse is leaving to left.
    if (this.props.value === 1 && event.nativeEvent.which === 1) {
      console.log(event.nativeEvent)
      // this.props.setVolume(0);
    }
  },

  render: function render() {
    const style = { opacity: this.props.value <= this.props.volume ? 1 : 0 }
    return (
      <li onMouseEnter={ this.onMouseEnter } onMouseLeave={ this.onMouseLeave }>
        <div className="vslider_stick" style={style}></div>
      </li>
    );
  },
});

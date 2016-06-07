import React from 'react';

module.exports = React.createClass({

  onMouseUp: function onMouseUp() {
    if (this.props.value === this.props.volume) {
      this.props.setVolume(this.props.value - 1);
    } else {
      this.props.setVolume(this.props.value);
    }
  },

  render: function render() {
    const style = { opacity: this.props.value <= this.props.volume ? 1 : 0 }
    return (
      <li onMouseUp={ this.onMouseUp }>
        <div className="vslider_stick" style={style}></div>
      </li>
    );
  },
});

import React from 'react';

module.exports = React.createClass({

  onMouseDown: function onMouseDown() {
    if (this.props.value === this.props.volume) {
      this.setVolume(this.props.value - 1);
    } else {
      this.setVolume(this.props.value);
    }
  },

  render: function render() {
    const style = { opacity: this.props.value <= this.props.volume ? 1 : 0 }
    return (
      <li onMouseDown={ this.onMouseDown }>
        <div className="vslider_stick" style={style}></div>
      </li>
    );
  },
});

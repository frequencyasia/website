import React from 'react';

module.exports = React.createClass({

  onMouseUp: function onMouseUp() {
  //   if (this.props.value === this.props.volume) {
  //     this.props.setVolume(this.props.value - 1);
  //   } else {
  //     this.props.setVolume(this.props.value);
  //   }
  },

  onMouseEnter: function onMouseEnter(event) {
    // Set volume to this value if mouse is down on enter.
    console.log(event)
    if (event.which === 1) {
      this.props.setVolume(this.props.value);
    }
  },

  render: function render() {
    const style = { opacity: this.props.value <= this.props.volume ? 1 : 0 }
    return (
      <li onMouseUp={ this.onMouseUp } onMouseEnter={ this.onMouseEnter }>
        <div className="vslider_stick" style={style}></div>
      </li>
    );
  },
});

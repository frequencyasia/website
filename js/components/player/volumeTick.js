import React from 'react';

module.exports = React.createClass({

  onMouseDown: function onMouseDown(event) {
    console.log('down')
  },

  onMouseUp: function onMouseDown(event) {
    console.log('up')
  },

  onDragEnter: function onDragEnter(event) {
    console.log('dragenter')
  },

  render: function render() {
    const style = { opacity: this.props.value <= this.props.volume ? 1 : 0 }
    return (
      <li onMouseUp={ this.onMouseUp } onMouseDown={ this.onMouseDown } onDragEnter={ this.onDragEnter }>
        <div className="vslider_stick" style={style}></div>
      </li>
    );
  },
});

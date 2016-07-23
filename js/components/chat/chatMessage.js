import React from 'react';

module.exports = React.createClass({

  propTypes: {
    user: React.PropTypes.string,
    message: React.PropTypes.string.isRequired,
    time: React.PropTypes.string.isRequired,
  },

  render: function render() {
    // If no user than this is a general/global notification.
    if (this.props.user) {
      return (
        <li className="c-chat-message">
          <h1 className="c-chat-message__header">{ this.props.user } <span className="c-chat-message__time">{ this.props.time }</span></h1>
          <p className="c-chat-message__body">{ this.props.message }</p>
        </li>
      );
    }
    return (
      <li><em>{ this.props.message }</em></li>
    );
  },
});

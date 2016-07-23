import React from 'react';
import fecha from 'fecha';
import i18next from 'i18next';

import ChatMessage from './chatMessage';
import PeopleList from './peopleList';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return {
      messages: [],
      people: {},
      isVisible: false,
      usernameExistsError: false,
    };
  },

  componentDidMount: function componentDidMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('message', (user, message, timestamp) => {
      const messages = this.state.messages;
      const time = fecha.format(new Date(timestamp), 'hh:mm A');
      messages.push({ user, message, time });
      this.setState({ messages });
    });
    this.socket.on('join-response', (isValid, name) => {
      if (isValid) {
        this.setState({ username: name });
      } else {
        this.setState({ usernameExistsError: true });
      }
    });
  },

  componentDidUpdate: function componentDidUpdate() {
    // Scroll chat to bottom
    if (this.state.username) {
      const chatElement = document.getElementById('chat-message-list');
      chatElement.scrollTop = chatElement.scrollHeight;
    }
  },

  toggleVisible: function toggleVisible() {
    this.setState({ isVisible: !this.state.isVisible });
  },

  onSendClick: function onSendClick() {
    // Send input to socket if not empty and then empty input.
    const value = document.getElementById('chat-message').value;
    if (value.length) {
      this.socket.emit('message', document.getElementById('chat-message').value);
      document.getElementById('chat-message').value = '';
    }
  },

  onSetUsernameClick: function onSendClick() {
    this.socket.emit('join', document.getElementById('set-username').value);
  },

  renderSelectUsername: function renderSelectUsername() {
    const onKeyPress = (event) => {
      if (event.key === 'Enter') {
        this.onSetUsernameClick();
      }
    };
    const renderErrorMessage = () => {
      if (this.state.usernameExistsError) {
        return <p>{ i18next.t('chatUsernameExists') }</p>;
      }
    };
    return (
      <div className="c-chat__container">
        <label htmlFor="set-username">Enter a name to use for chat:</label>
        { renderErrorMessage() }
        <input id="set-username" autoComplete="off" autoFocus onKeyPress={ onKeyPress }/>
        <button onClick={ this.onSetUsernameClick }>Set Username</button>
      </div>
    );
  },

  renderChat: function renderChat() {
    const onKeyPress = (event) => {
      if (event.key === 'Enter') {
        this.onSendClick();
      }
    };
    return (
      <div className="c-chat__container">
        <PeopleList people={ this.state.people }/>
        <ul id="chat-message-list" className="c-chat__message-list">
          { this.state.messages.map((message) => {
            return <ChatMessage {...message} />;
          }) }
        </ ul>
        <input id="chat-message" autoComplete="off" autoFocus onKeyPress={ onKeyPress }/>
        <button onClick={ this.onSendClick }>Send</button>
      </div>
    );
  },

  renderToggleButton: function renderToggleButton() {
    // Renders the button to toggle chat as visible or hidden.
    return (
      <button className="c-chat__toggle" onClick={ this.toggleVisible }>
        <span className="icon-chat"></span>
      </button>
    );
  },

  render: function render() {
    const className = this.state.isVisible ? 'c-chat c-chat--visible' : 'c-chat';
    if (this.state.username) {
      return (
        <div className={ className }>
          { this.renderToggleButton() }
          { this.renderChat() }
        </div>
      );
    }
    return (
      <div className={ className }>
        { this.renderToggleButton() }
        { this.renderSelectUsername() }
      </div>
    );
  },
});

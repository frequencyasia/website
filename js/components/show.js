import React from 'react';
import $ from 'jquery';
import fecha from 'fecha';

import Constants from './../constants';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return {
      name: '',
      image_path: '',
      description: '',
    };
  },

  componentWillMount: function componentWillMount() {
    $.getJSON(Constants.API_URL + 'shows/' + this.props.slug)
      .done((data) => {
        for (let i = 0; i < data.episodes.length; i++) {
          const item = data.episodes[i];
          item.date = fecha.format(new Date(item.start_time), 'dddd / MMMM D YYYY');
        }
        this.setState(data);
      });
  },

  renderSidebar: function renderSidebar() {
    const style = { backgroundImage: `url(/static/files/${this.state.image_path})` };
    return (
      <aside className="c-show__sidebar">
        <div className="c-show__sidebar__image" style={ style }></div>
        <h1 className="c-show__sidebar__title">{ this.state.name }</h1>
        <p>{ this.state.description }</p>
      </aside>
    );
  },

  render: function render() {
    return (
      <section className="c-show">
        { this.renderSidebar() }
        <section className="c-show__episodes"></section>
      </section>
    );
  },
});

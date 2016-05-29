import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-component';

module.exports = React.createClass({
  render: function render() {
    const link = 'shows/' + this.props.show.slug;
    const thumbnailStyle = { backgroundImage: `url('/static/files/${show.image_path}` };
    let episodes = '1 Episode';
    if (this.props.show.num_episodes !== 1) {
      episodes = this.props.show.num_episodes + ' Episodes';
    }
    return (
      <Link href={ link } class="post-module">
        <div className="thumbnail">
          <div className="thumbnail__img" style={ thumbnailStyle }></div>
        </div>
        <div className="post-content">
          <h1 className="title">{ this.props.show.name }</h1>
          <h2 className="sub_title">{ this.props.show.frequency }</h2>
          <p className="description">{ this.props.show.tagline }</p>
          <div className="post-meta">
            <span className="timestamp">{ episodes }</span>
          </div>
        </div>
      </Link>
    );
  },
});

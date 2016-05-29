import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-component';

module.exports = React.createClass({

  render: function render() {
    const show = this.props.show;
    const link = 'shows/' + show.slug;
    const thumbnailStyle = { backgroundImage: `url('/static/files/${show.image_path}` };
    let episodes = '1 Episode';
    if (show.num_episodes !== 1) {
      episodes = show.num_episodes + ' Episodes';
    }
    return (
      <Link href={ link } class="post-module">
        <div className="thumbnail">
          <div className="thumbnail__img" style={ thumbnailStyle }></div>
        </div>
        <div className="post-content">
          <h1 className="title">{ show.name }</h1>
          <h2 className="sub_title">{ show.frequency }</h2>
          <p className="description">{ show.tagline }</p>
          <div className="post-meta">
            <span className="timestamp">{ episodes }</span>
          </div>
        </div>
      </Link>
    );
  },
});

import React from 'react';
import { Link } from 'react-router-component';

module.exports = React.createClass({
  propTypes: {
    slug: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    frequency: React.PropTypes.string.isRequired,
    tagline: React.PropTypes.string.isRequired,
    num_episodes: React.PropTypes.number.isRequired,
    image_path: React.PropTypes.string.isRequired,
  },

  render: function render() {
    const link = '/shows/' + this.props.slug;
    const thumbnailStyle = { backgroundImage: `url('/static/files/${this.props.image_path}` };
    let episodes = '1 Episode';
    if (this.props.num_episodes !== 1) {
      episodes = this.props.num_episodes + ' Episodes';
    }
    return (
      <Link href={ link } className="post-module">
        <div className="thumbnail">
          <div className="thumbnail__img" style={ thumbnailStyle }></div>
        </div>
        <div className="post-content">
          <h1 className="title">{ this.props.name }</h1>
          <h2 className="sub_title">{ this.props.frequency }</h2>
          <p className="description">{ this.props.tagline }</p>
          <div className="post-meta">
            <span className="timestamp">{ episodes }</span>
          </div>
        </div>
      </Link>
    );
  },
});

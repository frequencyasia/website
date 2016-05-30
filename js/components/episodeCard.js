import React from 'react';
import { Link } from 'react-router-component';

module.exports = React.createClass({
  // propTypes: {
  //   slug: React.PropTypes.string.isRequired,
  //   name: React.PropTypes.string.isRequired,
  //   frequency: React.PropTypes.string.isRequired,
  //   tagline: React.PropTypes.string.isRequired,
  //   num_episodes: React.PropTypes.number.isRequired,
  //   image_path: React.PropTypes.string.isRequired,
  // },

  renderPlayButton: function renderPlayButton() {
    if (this.props.mixcloud_link && this.props.mixcloud_link.length) {
      return (
        <div className="c-episode__content__play js-play-episode" data-mixcloud={ this.props.mixcloud_link }>
          <span className="icon-play2 c-episode__content__play__icon"></span>
        </div>
      );
    }
  },

  renderTags: function renderTags() {
    const tags = []
    this.props.countries.forEach((tag) => {
      const link = '/wiki/countries/' + tag.slug;
      tags.push(<Link href={ link }>{ tag.name }</Link>);
    });
    this.props.cities.forEach((tag) => {
      const link = '/wiki/cities/' + tag.slug;
      tags.push(<Link href={ link }>{ tag.name }</Link>);
    });
    this.props.artists.forEach((tag) => {
      const link = '/wiki/artists/' + tag.slug;
      tags.push(<Link href={ link }>{ tag.name }</Link>);
    });
    return tags;
  },

  renderThumbnail: function renderThumbnail() {
    if (this.props.episode_image) {
      const src = '/static/files/' + this.props.episode_image;
      return (<img className="c-episode__content__image" src={ src } alt={ this.props.name } />);
    }
  },

  render: function render() {
    return (
      <article className="c-episode">
        <div className="c-episode__content">
          { this.renderPlayButton() }
          <div className="c-episode__content__info">
            <h1 className="c-episode__content__title">{ this.props.name }</h1>
            <p>{ this.props.tagline }</p>
            <p className="c-episode__content__date">{ this.props.date }</p>
            <p className="c-episode__content__tags">
              { this.renderTags() }
            </p>
          </div>
          { this.renderThumbnail() }
        </div>
        <div className="c-episode__description-toggle">+ More Info</div>
        <div className="c-episode__description">{ this.props.description }</div>
      </article>
    );
  },
});

import React from 'react';
import { Link } from 'react-router-component';
import PubSub from 'pubsub-js';

import Constants from './../constants';

module.exports = React.createClass({
  propTypes: {
    mixcloud_link: React.PropTypes.string,
    countries: React.PropTypes.array.isRequired,
    cities: React.PropTypes.array.isRequired,
    artists: React.PropTypes.array.isRequired,
    episode_image: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    tagline: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
  },

  getInitialState: function getInitialState() {
    return { expanded: false };
  },

  onPlayClicked: function onPlayClicked() {
    PubSub.publish(Constants.PUB_SUB_LABEL.MIXCLOUD_URL, this.props.mixcloud_link);
  },

  renderPlayButton: function renderPlayButton() {
    if (this.props.mixcloud_link && this.props.mixcloud_link.length) {
      return (
        <div className="c-episode__content__play" onClick={ this.onPlayClicked }>
          <span className="icon-play2 c-episode__content__play__icon"></span>
        </div>
      );
    }
  },

  renderTags: function renderTags() {
    const tags = [];
    this.props.countries.forEach((tag) => {
      const link = '/wiki/countries/' + tag.slug;
      tags.push(<Link href={ link }>{ tag.name }</Link>);
      tags.push(<span> / </span>);
    });
    this.props.cities.forEach((tag) => {
      const link = '/wiki/cities/' + tag.slug;
      tags.push(<Link href={ link }>{ tag.name }</Link>);
      tags.push(<span> / </span>);
    });
    this.props.artists.forEach((tag) => {
      const link = '/wiki/artists/' + tag.slug;
      tags.push(<Link href={ link }>{ tag.name }</Link>);
      tags.push(<span> / </span>);
    });
    tags.pop();
    return tags;
  },

  renderThumbnail: function renderThumbnail() {
    if (this.props.episode_image) {
      const src = '/static/files/' + this.props.episode_image;
      return (<img className="c-episode__content__image" src={ src } alt={ this.props.name } />);
    }
  },

  onMoreInfoClicked: function onMoreInfoClicked() {
    this.setState({ expanded: !this.state.expanded });
  },

  render: function render() {
    let descriptionToggleText = '+ More Info';
    let descriptionStyle = 'c-episode__description';
    if (this.state.expanded) {
      descriptionStyle += ' c-episode__description--toggled';
      descriptionToggleText = '- Less Info';
    }
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
        <div className="c-episode__description-toggle" onClick={ this.onMoreInfoClicked } >{ descriptionToggleText }</div>
        <div className={ descriptionStyle } dangerouslySetInnerHTML={ { __html: this.props.description } }/>
      </article>
    );
  },
});

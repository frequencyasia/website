import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-component';
require('swiper');
import i18next from 'i18next';

import Constants from './../constants';

module.exports = React.createClass({

  propTypes: {
    nowPlayingSlug: React.PropTypes.string.isRequired,
  },

  numShowcaseItems: 5,

  getInitialState: function getInitialState() {
    return {
      episodes: [],
    };
  },

  componentDidMount: function componentDidMount() {
    document.title = 'Frequency Asia';
    $.getJSON(`${Constants.API_URL}episodes/released?length=${this.numShowcaseItems}&showcase=true`)
      .done((data) => {
        this.setState({ episodes: data.episodes });
      });
  },

  renderNowPlaying: function renderNowPlaying(episodeSlug) {
    if (episodeSlug === this.props.nowPlayingSlug) {
      return ` [${i18next.t('nowPlaying')}]`;
    }
    return '';
  },

  renderSlide: function renderSlide(episode) {
    const style = {
      'background': 'linear-gradient(to right, rgba(0, 0, 0, 0.5),  rgba(0, 0, 0, 0.5)), url("/static/files/' + episode.image_path + '") no-repeat center center',
      'WebkitBackgroundSize': 'cover',
      'MozBackgroundSize': 'cover',
      'OBackgroundSize': 'cover',
      'backgroundSize': 'cover',
    };
    const link = '/shows/' + episode.show.slug;
    return (
      <div className="swiper-slide" style={ style } key={ episode.id }>
        <div className="c-featured-item">
          <div className="c-featured-item__background"></div>
          <article className="c-featured-item__container">
            <h1 className="c-featured-item__container__title">{ episode.show.name }{ this.renderNowPlaying(episode) }</h1>
            <p className="c-featured-item__container__tagline">{ episode.tagline }</p>
            <p className="c-featured-item__container__tagline"><Link href={ link }>{ i18next.t('seeAllEpisodes') }</Link></p>
          </article>
        </div>
      </div>
    );
  },

  render: function render() {
    return (
      <div className="o-feature-slider">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            { this.state.episodes.map((episode) => { return this.renderSlide(episode); }) }
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </div>
    );
  },

  componentDidUpdate: function componentDidUpdate() {
    this.initSwiper();
  },

  initSwiper: function initSwiper() {
    // Needs to be triggered after Virtual DOM is attached.
    if ($('.swiper-container').length) {
      this.swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        preventClicks: false,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        keyboardControl: true,
        autoplay: 5000,
      });
    }
  },
});

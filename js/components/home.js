import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-component';
require('swiper');

import Constants from './../constants';

module.exports = React.createClass({
  numShowcaseItems: 5,

  getInitialState: function getInitialState() {
    return {
      episodes: [],
    };
  },

  componentWillMount: function componentWillMount() {
    $.getJSON(`${Constants.API_URL}episodes/released?length=${this.numShowcaseItems}&showcase=true`)
      .done((data) => {
        this.setState({ episodes: data.episodes });
      });
  },

  renderSlide: function renderSlide(episode) {
    const style = {
      'background': 'linear-gradient(to right, rgba(0, 0, 0, 0.5),  rgba(0, 0, 0, 0.5)), url("/static/files/' + episode.image_path + '") no-repeat center center',
      '-webkit-background-size': 'cover',
      '-moz-background-size': 'cover',
      '-o-background-size': 'cover',
      'background-size': 'cover',
    };
    return (
      <div className="swiper-slide" style={ style }>
        <div className="c-featured-item">
          <div className="c-featured-item__background"></div>
          <article className="c-featured-item__container">
            <h1 className="c-featured-item__container__title">{ episode.show.name }</h1>
            <p className="c-featured-item__container__tagline">{ episode.tagline }</p>
            <p className="c-featured-item__container__tagline"><Link href="shows/{ episode.show.slug }">SEE ALL EPISODES</Link></p>
          </article>
        </div>
      </div>
    );
  },

  render: function render() {
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          { this.state.episodes.map((episode) => { return this.renderSlide(episode); }) }
        </div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </div>
    );
  },

  componentDidUpdate: function componentDidUpdate() {
    this.initSwiper();
  },

  initSwiper: function initSwiper() {
    // Needs to be triggered after Virtual DOM is attached.
    if (this.$('.swiper-container').length) {
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

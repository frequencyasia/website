import React from 'react';
import $ from 'jquery';
import fecha from 'fecha';
import keys from 'lodash/keys';
import { Link } from 'react-router-component';
import i18next from 'i18next';

import Constants from './../constants';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return {
      schedule: [],
    };
  },

  componentDidMount: function componentDidMount() {
    document.title = `${i18next.t('schedule')} | ${i18next.t('freqAsia')}`;
    $.getJSON(Constants.API_URL + 'episodes/scheduled')
      .done((data) => {
        this.parseScheduleData(data.episodes);
      });
  },

  parseScheduleData: function parseScheduleData(data) {
    const days = {};
    const parsedData = [];
    data.map((episode) => {
      episode.scheduleTime = fecha.format(episode.start_time, 'HHmm') + ' - ' + fecha.format(episode.end_time, 'HHmm');
      const day = episode.start_time - episode.start_time % 86400000;
      if (days.hasOwnProperty(day)) {
        days[day].shows.push(episode);
      } else {
        days[day] = { shows: [episode] };
      }
    });
    keys(days).map((key) => {
      days[key].heading = fecha.format(days[key].shows[0].start_time, 'dddd / MMMM D').toUpperCase();
      parsedData.push(days[key]);
    });
    parsedData.sort((itemA, itemB) => {
      return itemA.shows[0].start_time - itemB.shows[0].start_time;
    });
    this.setState({ schedule: parsedData });
  },

  renderScheduledEpisode: function renderScheduledEpisode(episode) {
    const link = '/shows/' + episode.show.slug;
    const text = `${episode.scheduleTime} / ${episode.name}`;
    return (<p><Link href={ link }>{ text }</Link></p>);
  },

  renderDay: function renderDay(day) {
    return (
      <div>
        <h1>{ day.heading }</h1>
        { day.shows.map((episode) => { return this.renderScheduledEpisode(episode); }) }
      </div>
    );
  },

  render: function render() {
    return (
      <div className="o-content-block">
        <div className="column">
          { this.state.schedule.map((day) => { return this.renderDay(day); }) }
        </div>
      </div>
    );
  },
});

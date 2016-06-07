import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-component';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Constants from './../constants';

module.exports = React.createClass({

  getInitialState: function getInitialState() {
    return {
      artists: {},
    };
  },

  componentDidMount: function componentDidMount() {
    $.getJSON(Constants.API_URL + 'artists')
      .done((data) => {
        this.setState({ artists: this.alphabetiseArtists(data.items) });
      });
  },

  isLetter: function isLetter(char) {
    return char.match(/[a-z]/i);
  },

  alphabetiseArtists: function alphabetiseArtists(artists) {
    const alphabetisedArtists = Object.assign({}, Constants.TABS_TEMPLATE);
    for (const artist of artists) {
      const initial = artist.slug[0];
      if (this.isLetter(initial)) {
        alphabetisedArtists[initial.toLowerCase()].push(artist);
      } else {
        alphabetisedArtists['#'].push(artist);
      }
    }
    return alphabetisedArtists;
  },

  renderTabs: function renderTabs() {
    return Object.keys(this.state.artists).map((key) => {
      return <Tab>{ key }</Tab>;
    });
  },

  renderPanels: function renderPanels() {
    return Object.keys(this.state.artists).map((key) => {
      return (
        <TabPanel>
          <ul>
            { this.state.artists[key].map((artist) => {
              const link = '/wiki/artists/' + artist.slug;
              return <li className="c-wiki__list__item" key={ artist.slug }><Link href={ link }>{ artist.name }</Link></li>;
            }) }
          </ul>
        </TabPanel>
      );
    });
  },

  render: function render() {
    return (
      <div className="o-content-block">
        <section className="c-content">
          <div className="row">
            <div className="col">
              <h1><Link className="u-no-border" href="/wiki">Wiki</Link> &rsaquo; Artists</h1>
              <Tabs>
                <TabList>
                  { this.renderTabs() }
                </TabList>
                { this.renderPanels() }
              </Tabs>
            </div>
          </div>
        </section>
      </div>
    );
  },
});

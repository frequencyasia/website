import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-component';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Constants from './../constants';

module.exports = React.createClass({

  propTypes: {
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    useTabs: React.PropTypes.bool,
  },

  getInitialState: function getInitialState() {
    return {
      tags: {},
    };
  },

  componentDidMount: function componentDidMount() {
    $.getJSON(Constants.API_URL + this.props.type)
      .done((data) => {
        const tags = this.props.useTabs ? this.alphabetiseTags(data.items) : data.items;
        this.setState({ tags });
      });
  },

  isLetter: function isLetter(char) {
    return char.match(/[a-z]/i);
  },

  alphabetiseTags: function alphabetiseTags(tags) {
    const alphabetisedTags = Object.assign({}, Constants.TABS_TEMPLATE);
    for (const tag of tags) {
      const initial = tag.slug[0];
      if (this.isLetter(initial)) {
        alphabetisedTags[initial.toLowerCase()].push(tag);
      } else {
        alphabetisedTags['#'].push(tag);
      }
    }
    return alphabetisedTags;
  },

  renderTabs: function renderTabs() {
    return Object.keys(this.state.tags).map((key) => {
      return <Tab>{ key }</Tab>;
    });
  },

  renderTag: function renderTag(tag) {
    const link = `/wiki/${ this.props.type }/${tag.slug}`;
    return <li className="c-wiki__list__item" key={ tag.slug }><Link href={ link }>{ tag.name }</Link></li>;
  },

  renderPanels: function renderPanels() {
    return Object.keys(this.state.tags).map((key) => {
      return (
        <TabPanel>
          <ul>{ this.state.tags[key].map(this.renderTag) }</ul>
        </TabPanel>
      );
    });
  },

  renderTags: function renderTags() {
    if (this.props.useTabs) {
      return (
        <Tabs>
          <TabList>
            { this.renderTabs() }
          </TabList>
          { this.renderPanels() }
        </Tabs>
      );
    }
    return (<ul>{ this.state.tags.map(this.renderTag) }</ul>);
  },

  render: function render() {
    return (
      <div className="o-content-block">
        <section className="c-content">
          <div className="row">
            <div className="col">
              <h1><Link className="u-no-border" href="/wiki">Wiki</Link> &rsaquo; { this.props.label }</h1>
              { this.renderTags() }
            </div>
          </div>
        </section>
      </div>
    );
  },
});

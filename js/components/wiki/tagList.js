import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-component';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Constants from './../../constants';

module.exports = React.createClass({

  propTypes: {
    type: React.PropTypes.string.isRequired,
    useTabs: React.PropTypes.bool,
  },

  getInitialState: function getInitialState() {
    return {
      tags: [],
      alphabetisedTags: {},
    };
  },

  componentDidMount: function componentDidMount() {
    console.log(this)
    $.getJSON(Constants.API_URL + this.props.type)
      .done((data) => {
        if (this.props.useTabs) {
          this.setState({ alphabetisedTags: this.alphabetiseTags(data.items) });
        } else {
          this.setState({ tags: data.items });
        }
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
    return Object.keys(this.state.alphabetisedTags).map((key) => {
      return <Tab>{ key }</Tab>;
    });
  },

  renderTag: function renderTag(tag) {
    const link = `/wiki/${ this.props.type }/${tag.slug}`;
    return <li className="c-wiki__list__item" key={ tag.slug }><Link href={ link }>{ tag.name }</Link></li>;
  },

  renderPanels: function renderPanels() {
    return Object.keys(this.state.alphabetisedTags).map((key) => {
      return (
        <TabPanel>
          <ul>{ this.state.alphabetisedTags[key].map(this.renderTag) }</ul>
        </TabPanel>
      );
    });
  },

  render: function render() {
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
});

import React from 'react';
import { Link } from 'react-router-component';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Constants from './../../constants';

module.exports = React.createClass({

  propTypes: {
    type: React.PropTypes.string.isRequired,
    tags: React.PropTypes.array.isRequired,
    useTabs: React.PropTypes.bool,
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

  renderTabs: function renderTabs(alphabetisedTags) {
    return Object.keys(alphabetisedTags).map((key) => {
      return <Tab>{ key }</Tab>;
    });
  },

  renderTag: function renderTag(tag) {
    const link = `/wiki/${ this.props.type }/${tag.slug}`;
    return <li className="c-wiki__list__item" key={ tag.slug }><Link href={ link }>{ tag.name }</Link></li>;
  },

  renderPanels: function renderPanels(alphabetisedTags) {
    return Object.keys(alphabetisedTags).map((key) => {
      return (
        <TabPanel>
          <ul>{ alphabetisedTags[key].map(this.renderTag) }</ul>
        </TabPanel>
      );
    });
  },

  render: function render() {
    if (this.props.useTabs) {
      const alphabetisedTags = this.alphabetiseTags(this.props.tags);
      return (
        <Tabs>
          <TabList>
            { this.renderTabs(alphabetisedTags) }
          </TabList>
          { this.renderPanels(alphabetisedTags) }
        </Tabs>
      );
    }
    return (<ul>{ this.props.tags.map(this.renderTag) }</ul>);
  },
});

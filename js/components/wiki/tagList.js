import React from 'react';
import { Link } from 'react-router-component';
import Tabs from 'react-simpletabs';

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
      return <Tabs.Panel title={ key }>{ this.renderPanel(alphabetisedTags[key]) }</Tabs.Panel>;
    });
  },

  renderTag: function renderTag(tag) {
    const link = `/wiki/${ this.props.type }/${tag.slug}`;
    return <li className="c-wiki__list__item" key={ tag.slug }><Link href={ link }>{ tag.name }</Link></li>;
  },

  renderPanel: function renderPanel(tags) {
    return (
      <div>
        <ul>{ tags.map(this.renderTag) }</ul>
      </div>
    );
  },

  render: function render() {
    if (this.props.useTabs) {
      const alphabetisedTags = this.alphabetiseTags(this.props.tags);
      return (
        <Tabs>
          { this.renderTabs(alphabetisedTags) }
        </Tabs>
      );
    }
    return (<ul>{ this.props.tags.map(this.renderTag) }</ul>);
  },
});

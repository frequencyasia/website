import React from 'react';
import i18next from 'i18next';

module.exports = React.createClass({

  componentDidMount: function componentDidMount() {
    document.title = i18next.t('pageNotFound') + ' | ' + i18next.t('frequencyAsia');
  },

  render: function render() {
    return ('<p>404</p>');
  },
});

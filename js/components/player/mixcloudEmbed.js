import React from 'react';

module.exports = React.createClass({

  propTypes: {
    link: React.PropTypes.string.isRequired,
    onBackClicked: React.PropTypes.func.isRequired,
  },

  render: function render() {
    const url = 'https://www.mixcloud.com/widget/iframe/?autoplay=1&amp;embed_type=widget_standard&amp;embed_uuid=99755eaf-a63a-4a7d-af25-efbb86e6480b&amp;feed=' + this.props.link + ';hide_cover=1&amp;hide_tracklist=1&amp;light=0&amp;mini=1&amp;replace=0';
    return (
      <div className="c-player">
        <button className="c-player__button" onClick={ this.props.onBackClicked }>
          <span className="icon-arrow-back"></span>
        </button>
        <iframe width="100%" height="60" src={ url } frameBorder="0"></iframe>
      </div>
    );
  },
});

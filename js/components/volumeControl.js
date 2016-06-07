import React from 'react';
import $ from 'jquery';

module.exports = React.createClass({

  // var startDrag = function (event) {
  //    renderUI(getPercent(event));
  //    $(document.body).on('mousemove', onDrag);
  //    $(document.body).on('mouseup', stopDrag);
  //  },
  //  stopDrag = function (event) {
  //    $(document.body).off('mouseup', stopDrag);
  //    $(document.body).off('mousemove', onDrag);
  //  },
  //  onDrag = function (event) {
  //    var percent = getPercent(event);
  //    renderUI(percent);
  //    var stream = document.getElementById("stream-player");
  //    stream.volume = percent;
  //  };
  // }
  // var renderUI = function(percent) {
  //   var index = Math.round(percent * steps);
  //   index = index < steps ? index : steps;
  //
  //   $('.vslider_sticks > li').find('div').css('opacity', 0);
  //
  //   for(var i = 0; i < index; i++) {
  //     $('.vslider_sticks > li:eq(' + i + ')').find('div').css('opacity', 1);
  //   }
  // };
  // renderUI(defValue);
  //
  // var getPercent = function(event) {
  //   var percent = (event.pageX - $slider.offset().left) / $('.vslider_sticks').width();
  //   percent = percent >= 0 ? percent : 0;
  //   percent = percent <= 1 ? percent : 1;
  //   return percent;
  // };
  //
  // $slider.on('mousedown', startDrag);

  getPercent: function getPercent (event) {
    var percent = (event.pageX - $('.vslider').offset().left) / $('.vslider_sticks').width();
    percent = percent >= 0 ? percent : 0;
    percent = percent <= 1 ? percent : 1;
    return percent;
  },

  onSliderMouseDown: function onSliderMouseDown(event) {
    const onDrag = (e) => {
      console.log("!" + e);
    };
    const stopDrag = (e) => {
      console.log("!" + e);
    };
    console.log(this.getPercent(event));
    $(document.body).on('mousemove', onDrag);
    $(document.body).on('mouseup', stopDrag);
  },

  renderSliderTicks: function renderSliderTicks() {
    return [1,2,3,4,5,6,7,8,9,10].map((i) => {
      const style = { opacity: i <= this.props.volume ? 1 : 0 }
      return (
        <li>
          <div className="vslider_stick" style={ style }></div>
        </li>
      );
    });
  },

  render: function render() {
    return (
      <aside className="c-player__volume">
        <div className="vslider" onMouseDown={ this.onSliderMouseDown }>
          <input type="range" value={ this.props.volume } style={{ display: 'none' }} />
          <div className="vslider_bar"></div>
          <ul className="vslider_sticks">
            { this.renderSliderTicks() }
          </ul>
        </div>
      </aside>
    );
  },
});

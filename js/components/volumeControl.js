import React from 'react';

module.exports = React.createClass({

  // var $input = $('#volume-slider');
  // var steps = $input.attr('data-steps');
  // var defValue = $input.attr('value');
  // var $slider = $("<div class='vslider'><div class='vslider_bar'></div><ul class='vslider_sticks'></div>").appendTo($input.parent());
  // $input.hide();
  //
  // for (var i = 0; i < steps; i++) {
  //   var $stick = $('<li><div class="vslider_stick"a></div></li>').appendTo($slider.find('.vslider_sticks'));
  //   $stick.on('mouseenter', function(){
  //     $(this).addClass('active');
  //   }).on('mouseleave', function(){
  //     $(this).removeClass('active');
  // });
  //
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

  renderSliderTicks: function renderSliderTicks() {
    return [1,2,3,4,5,6,7,8,9,10].map(() => {
      return (<li><div className="vslider_stick"a></div></li>);
    });
  },

  render: function render() {
    return (
      <div className='vslider'>
        <div className='vslider_bar'></div>
        <ul className='vslider_sticks'>
          { this.renderSliderTicks() }
        </ul>
      </div>
    );
  },
});

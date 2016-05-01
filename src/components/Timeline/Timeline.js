import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import TimelinePin from './TimelinePin';
import TimelineLine from './TimelineLine';

@connect(
  state => ({
    timeline: state.timeline,
    routing: state.routing,
  })
)
export default class Timeline extends Component {
  static propTypes = {
    className: PropTypes.string,
    timeline: PropTypes.object,
    routing: PropTypes.object,
  };

  props = {
    className: '',
    timeline: {},
  };

  render() {
    const styles = require('./Timeline.scss');
    const { className, timeline, routing } = this.props;

    const timelineStyle = {};

    let pinX = 0;
    let pinY = 0;
    const currentPin = routing.locationBeforeTransitions.hash.substring(1);
    if (currentPin) {
      let pin;
      let index = 0;
      do {
        pin = timeline.pins[index++];
        pinX -= pin.dx * 100;
        pinY -= pin.dy * 100;
      } while (pin.id !== currentPin);
    }

    const lines = [];

    let lastX = pinX;
    let lastY = pinY;
    const pins = timeline.pins.map((pin, index) => {
      pinX += pin.dx * 100;
      pinY += pin.dy * 100;
      // add the line if not the last pin
      if (index > 0) {
        const lineStyle = {
          left: '50vw',
          top: '50vh',
        };
        const start = { pinX: lastX, pinY: lastY };
        const end = { pinX, pinY };
        lines.push(<TimelineLine key={`line_${pin.id}`} start={start} end={end} style={lineStyle}/>);
      }
      lastX = pinX;
      lastY = pinY;
      // add the pin
      if (pin.id === currentPin) {
        timelineStyle.backgroundImage = `url(${pin.background})`;
      }
      const style = {
        left: `calc(50vw + ${pinX}vh)`,
        top: (50 + pinY) + 'vh',
      };
      return <TimelinePin key={pin.id} data={pin} style={style} expanded={pin.id === currentPin} />;
    });

    return (
      <div className={cn(className, styles.timeline)} style={timelineStyle}>
        { lines }
        { pins }
      </div>
    );
  }
}


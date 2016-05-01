import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import TimelinePin from './TimelinePin';

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

    const pins = timeline.pins.map(pin => {
      pinX += pin.dx * 100;
      pinY += pin.dy * 100;
      const style = {
        left: `calc(50vw + ${pinX}vh)`,
        top: (50 + pinY) + 'vh',
      };
      return <TimelinePin key={new Date(pin.date).getTime()} data={pin} style={style} expanded={pin.id === currentPin} />;
    });

    return (
      <div className={cn(className, styles.timeline)}>
        { pins }
      </div>
    );
  }
}


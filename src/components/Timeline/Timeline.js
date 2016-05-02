import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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

  constructor() {
    super();
    this.state = {
      zoom: 1.0,
    };
  }

  props = {
    className: '',
    timeline: {},
  };

  handleWheel = (event) => {
    const nextZoom = this.state.zoom - (event.deltaY / 2000);
    this.setState({
      zoom: Math.max(0.3, Math.min(nextZoom, 1.0)),
    });
  };

  render() {
    const styles = require('./Timeline.scss');
    const { className, timeline, routing } = this.props;

    let pinX = 0;
    let pinY = 0;
    const curPinId = routing.locationBeforeTransitions.hash.substring(1);
    if (curPinId) {
      let pin;
      let index = 0;
      do {
        pin = timeline.pins[index++];
        pinX -= pin.dx * 100;
        pinY -= pin.dy * 100;
      } while (pin.id !== curPinId);
    }

    // calculate pin positions
    let currentPin = null;
    const points = [];
    timeline.pins.forEach(pin => {
      pinX += pin.dx * 100;
      pinY += pin.dy * 100;
      points.push({
        id: pin.id,
        x: pinX,
        y: pinY,
      });
      // add the pin
      if (pin.id === curPinId) {
        currentPin = pin;
      }
    });

    const middle = 50 / this.state.zoom;

    // create pin objects and store positions
    const pins = timeline.pins.map((pin, index) => {
      const style = {
        left: `calc(${middle}vw + ${points[index].x}vh)`,
        top: (middle + points[index].y) + 'vh',
      };
      return <TimelinePin key={pin.id} data={pin} style={style} expanded={pin.id === curPinId} />;
    });

    const lineStyle = {
      left: `${middle}vw`,
      top: `${middle}vh`,
    };
    const lines = [];
    for (let lineIndex = 0; lineIndex < (points.length - 1); lineIndex++) {
      lines.push(<TimelineLine key={`line_${points[lineIndex].id}`} points={points} index={lineIndex} style={lineStyle}/>);
    }

    const timelineStyle = {
      zoom: this.state.zoom,
    };
    if (currentPin && currentPin.background) {
      timelineStyle.backgroundImage = `url(${currentPin.background})`;
    }

    return (
      <div className={cn(className, styles.timeline)} style={timelineStyle} onWheel={this.handleWheel}>
        <ReactCSSTransitionGroup transitionName="timelinePins" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          { lines }
          { pins }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}


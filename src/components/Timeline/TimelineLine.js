import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import { cubicBezier, getCubicPoints } from './Storyboard';

export default class TimelineLine extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    points: PropTypes.array,
    index: PropTypes.number,
  };

  props = {
    className: '',
    style: {},
    start: { pinX: 0, pinY: 0 },
    end: { pinX: 0, pinY: 0 },
  };

  render() {
    const styles = require('./Timeline.scss');
    const { className, style, points, index } = this.props;

    const spacing = 2;

    const start = points[index];
    const end = points[index + 1];

    const dx = (end.x - start.x);
    const dy = (end.y - start.y);
    const len = Math.sqrt(dx * dx + dy * dy);
    const count = parseInt(len / spacing, 10);
    const dots = [];
    if (count >= 1) {
      const cp = getCubicPoints(points, index);
      for (let timeIndex = 0; timeIndex < count; timeIndex++) {
        const time = (((timeIndex + 0.5) / count) - 0.5) * 2;
        const pos = cubicBezier(start, cp[0], cp[1], end, (time < 0 ? 1 - Math.pow(-time, 1 / 1.1) : 1 + Math.pow(time, 1 / 1.1)) / 2);
        const dotStyle = {
          left: pos.x.toFixed(1) + 'vh',
          top: pos.y.toFixed(1) + 'vh',
        };
        dots.push(<div key={timeIndex} style={dotStyle}>&nbsp;</div>);
      }
    }

    const classes = cn(className, styles.timelineLine);
    return (
      <div className={classes} style={style}>
        { dots }
      </div>
    );
  }
}

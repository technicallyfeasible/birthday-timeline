import React, {Component, PropTypes} from 'react';
import cn from 'classnames';

function sq(val) {
  return val * val;
}

function quadraticBezierL(p0, p1, p2, time) {
  return sq(1 - time) * p0 + 2 * (1 - time) * time * p1 + sq(time) * p2;
}

function quadraticBezier(p0, p1, p2, time) {
  return {
    x: quadraticBezierL(p0.x, p1.x, p2.x, time),
    y: quadraticBezierL(p0.y, p1.y, p2.y, time),
  };
}

function cubicBezier(p0, p1, p2, p3, time) {
  const left = quadraticBezier(p0, p1, p2, time);
  const right = quadraticBezier(p1, p2, p3, time);
  return {
    x: (1 - time) * left.x + time * right.x,
    y: (1 - time) * left.y + time * right.y,
  };
}

export default class TimelineLine extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    start: PropTypes.object,
    end: PropTypes.object,
  };

  props = {
    className: '',
    style: {},
    start: { pinX: 0, pinY: 0 },
    end: { pinX: 0, pinY: 0 },
  };

  render() {
    const styles = require('./Timeline.scss');
    const { className, style, start, end } = this.props;

    const spacing = 2;

    const len = Math.sqrt(Math.pow(end.pinX - start.pinX, 2) + Math.pow(end.pinY - start.pinY, 2));
    const count = parseInt(len / spacing, 10);
    const dots = [];
    if (count >= 1) {
      const dx = (end.pinX - start.pinX);
      const dy = (end.pinY - start.pinY);
      const dist = 1.5;
      const p0 = { x: start.pinX, y: start.pinY };
      const p1 = Math.abs(dx) >= Math.abs(dy) ? { x: start.pinX + dx / dist, y: start.pinY } : { x: start.pinX, y: start.pinY + dy / dist };
      const p2 = Math.abs(dx) >= Math.abs(dy) ? { x: end.pinX - dx / dist, y: end.pinY } : { x: end.pinX, y: end.pinY - dy / dist };
      const p3 = { x: end.pinX, y: end.pinY };
      for (let index = 0; index < count; index++) {
        const time = (((index + 0.5) / count) - 0.5) * 2;
        const pos = cubicBezier(p0, p1, p2, p3, (time < 0 ? 1 - Math.pow(-time, 1 / 1.1) : 1 + Math.pow(time, 1 / 1.1)) / 2);
        const dotStyle = {
          left: pos.x.toFixed(1) + 'vh',
          top: pos.y.toFixed(1) + 'vh',
        };
        dots.push(<div key={index} style={dotStyle}>&nbsp;</div>);
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

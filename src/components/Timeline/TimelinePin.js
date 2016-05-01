import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import moment from 'moment';

export default class TimelinePin extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.shape({
      image: PropTypes.string,
    }),
    expanded: PropTypes.bool,
  };

  props = {
    className: '',
    style: {},
    data: {
      image: ''
    },
    expanded: false,
  };

  handleSelect = () => {
    const { data } = this.props;
    if (!data || !data.id) return;
    document.location.hash = '#' + data.id;
  };

  render() {
    const styles = require('./Timeline.scss');
    const { className, style, data, expanded } = this.props;

    const classes = cn(className, styles.timelinePin, {
      [styles.expand]: expanded,
    });
    return (
      <div className={classes} style={style} onClick={this.handleSelect}>
        <div className={styles.thumbnail}>{ data ? <img src={data.image} /> : null }</div>
        <div className={styles.date}>{ moment(data.date).format('LL') }</div>
      </div>
    );
  }
}

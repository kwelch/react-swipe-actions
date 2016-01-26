/**
 * Created by Kyle on 1/10/2016.
 */
import React, { PropTypes } from 'react';

const SwipeAction = (props) => {
  const { direction, text, className } = props;
  const actionStyle = {
    flex: 1,
    alginSelf: 'center',
    textAlign: direction,
  };

  return <div style={actionStyle} className={className}>{text}</div>;
};

SwipeAction.propTypes = {
  text: PropTypes.string.isRequired,
  // current only supporting right|left
  direction: PropTypes.oneOf(['right', 'left']),
  className: PropTypes.string,
};

export default SwipeAction;

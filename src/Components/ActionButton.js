/**
 * Created by Kyle on 1/10/2016.
 */
import React, { Component, PropTypes } from 'react';

class ActionButton extends Component {
  render() {
    return (
      <div style={{
        flex: 1,
        alignSelf: 'center',
        textAlign: this.props.direction,
      }
      }
      >
        {this.props.text}
      </div>);
  }
}

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  // current only supporting right|left
  direction: PropTypes.oneOf(['right', 'left']),
};

export default ActionButton;

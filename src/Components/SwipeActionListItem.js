/**
 * Created by Kyle on 1/25/2016.
 */
import React, { PropTypes } from 'react';
import SwipeAction from './SwipeAction';

class SwipeActionListItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      actionDirection: null,
      actionDistance: 0,
      dragState: {
        isDown: false,
        start: { x: 0, y: 0 },
        current: { x: 0, y: 0 },
      },
    };
    this.onMoveStart = this.onMoveStart.bind(this);
    this.onMoving = this.onMoving.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
  }

  onMoveStart(event) {
    const actionCoord = SwipeActionListItem.findEventCoord(event);
    this.setState({
      dragState: {
        isDown: true,
        current: actionCoord,
        start: actionCoord,
      },
    });
  }

  onMoving(event) {
    if (this.state.dragState.isDown) {
      const actionCoord = SwipeActionListItem.findEventCoord(event);
      const dragState = this.state.dragState;

      this.setState({
        dragState: Object.assign({}, dragState, { current: actionCoord }),
      }, this.determineAction);
    }
  }

  onMoveEnd(event) {
    const actionCoord = SwipeActionListItem.findEventCoord(event);
    const dragState = this.state.dragState;

    this.setState({
      dragState: Object.assign({}, dragState, {
        current: actionCoord,
        isDown: false,
      }),
    }, this.determineAction);
  }

  onSelect() {
    return false;
  }

  static mapActionsToArray(actions) {
    const actionArr = [];
    for (const key in actions) {
      if (actions.hasOwnProperty(key)) {
        actionArr.push(Object.assign({}, {
          direction: key,
        }, actions[key]));
      }
    }

    return actionArr;
  }

  static findEventCoord(event) {
    if (event.clientX) {
      return { x: event.clientX, y: event.clientY };
    }

    if (event.touches[0]) {
      return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }

    return { x: 0, y: 0 };
  }

  determineAction() {
    const dragState = this.state.dragState;
    const deltaX = dragState.start.x - dragState.current.x;
    const xDirection = deltaX > 0 ? 'right' : 'left';
    const deltaY = dragState.start.y - dragState.current.y;
    const yDirection = deltaY > 0 ? 'bottom' : 'top';

    this.setState({
      actionDirection: (Math.abs(deltaX) > Math.abs(deltaY) ? xDirection : yDirection),
      actionDistance: (Math.abs(deltaX) > Math.abs(deltaY) ? Math.abs(deltaX) : Math.abs(deltaY)),
    });
  }

  render() {
    const currentAction = this.props.actions[this.state.actionDirection];
    const actionContStyle = {
      margin: 0,
      padding: 0,
      position: 'absolute',
      top: 0,
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: currentAction ? currentAction.actionColor : 'inherit',
    };
    const actionCont = (
      <div style={actionContStyle}>
        {SwipeActionListItem.mapActionsToArray(this.props.actions).map(a => {
          return <SwipeAction key={a.direction} {...a} />;
        })}
      </div>);

    const actionStyle = {};
    if (currentAction) {
      if (this.state.actionDistance > currentAction.minThreshold || 0) {
        actionStyle[this.state.actionDirection] = this.state.actionDistance;
      }
    }

    return (
      <li style={{ position: 'relative' }}
        onMouseDown={this.onMoveStart}
        onMouseUp={this.onMoveEnd}
        onMouseMove={this.onMoving}
        onTouchStart={this.onMoveStart}
        onTouchEnd={this.onMoveEnd}
        onSelect={this.onSelect}
      >
        {actionCont}
        <div style={ Object.assign({ zIndex: 1, position: 'relative' }, actionStyle) }>
          {this.props.children}
        </div>
      </li>);
  }
}

SwipeActionListItem.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.objectOf(PropTypes.shape({
    actionColor: PropTypes.string.isRequired,
    minThreshold: PropTypes.number,
    text: PropTypes.string.isRequired,
    actionThreshold: PropTypes.number,
    action: PropTypes.func.isRequired,
  })).isRequired,
};

export default SwipeActionListItem;

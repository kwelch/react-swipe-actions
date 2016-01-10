/**
 * Created by Kyle on 1/8/2016.
 */
import React, { Component, PropTypes } from 'react';
import ActionButton from './Components/ActionButton';

class SwipableListItem extends Component {
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
  }

  onMoveStart(event) {
    const actionCoord = SwipableListItem.findEventCoord(event);
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
      const actionCoord = this.findEventCoord(event);
      const dragState = this.state.dragState;

      this.setState({
        dragState: Object.assign({}, dragState, { current: actionCoord }),
      }, this.determineAction);
    }
  }

  onMoveEnd(event) {
    const actionCoord = this.findEventCoord(event);
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

  static mapActionsToArray(...actions) {
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
    const actionCont = (
      <div style={{
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: currentAction ? currentAction.actionColor : 'inherit',
      }
      }
      >
        { SwipableListItem.mapActionsToArray(this.props.actions).map(a => <ActionButton {...a} />) }
      </div>);

    const actionStyle = currentAction && this.state.actionDistance > currentAction.minThreshold ?
    { [this.state.actionDirection]: this.state.actionDistance } : {};

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
        <div style={
        Object.assign({ zIndex: 1, position: 'relative' },
        actionStyle)
        }
        >
          {this.props.children}
        </div>
      </li>);
  }
}

SwipableListItem.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.arrayOf(PropTypes.shape({
    actionColor: PropTypes.string,
    minThreshold: PropTypes.number,
    text: PropTypes.string,
    actionThreshold: PropTypes.number,
    action: PropTypes.func.isRequired,
  })).isRequired,
};

export default SwipableListItem;

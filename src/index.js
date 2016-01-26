/**
 * Created by Kyle on 1/8/2016.
 */
import React, { PropTypes } from 'react';
import SwipeActionListItem from './Components/SwipeActionListItem';

const SwipeActionList = (props) => {
  const { listItems, actionEvents } = props;

  const listStyle = {
    verflow: 'hidden',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  return (<ul style={listStyle}>
    {listItems.map((item) => {
      return (<SwipeActionListItem
        key={item.key}
        actions={actionEvents}
        actionDirection={item.actionDirection}
        actionDistance={item.actionDistance}
      >
        {item.node}
      </SwipeActionListItem>);
    })}
  </ul>);
};

SwipeActionList.propTypes = {
  listItems: PropTypes.shape({
    key: PropTypes.number.isRequired,
    node: PropTypes.node.isRequired,
    actionDirection: PropTypes.string,
    actionDistance: PropTypes.number,
  }),
  actionEvents: PropTypes.array,
};

export default SwipeActionList;

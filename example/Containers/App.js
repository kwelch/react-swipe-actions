/**
 * Created by Kyle on 1/10/2016.
 */
import React, { Component } from 'react';
//import SwipeableListItem from 'react-swipe-actions';
import SwipeableListItem from '../../lib/index';

export default class App extends React.Component {
  render() {
    return (<ul style={{
      overflow: "hidden",
      listStyle: "none",
      padding: 0,
      margin: 0
    }}
    >
      { this.props.listItems.map((item, index) => {
        return (<SwipeableListItem
          key={index}
          actions={this.props.actionEvents}
          actionDirection={item.actionDirection}
          actionDistance={item.actionDistance}
        >
          <span>{item.text}</span>
        </SwipeableListItem>);
      }) }
    </ul>);
  }
}

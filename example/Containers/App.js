/**
 * Created by Kyle on 1/10/2016.
 */
import React, { Component } from 'react';
import SwipeableListItem from 'react-swipe-actions';

export default class App extends React.Component {
  render() {
    return (<ul style={{
      overflow: "hidden",
      listStyle: "none",
      padding: 0,
      margin: 0
    }}
    >
      { this.props.listItems.map(i=> {
        return <SwipeableListItem
          actions={this.props.actionEvents}
          actionDirection={i.actionDirection}
          actionDistance={i.actionDistance}
        >
          <span>{i.text}</span>
        </SwipeableListItem>
      }) }
    </ul>);
  }
}

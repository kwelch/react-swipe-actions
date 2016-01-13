/**
 * Created by Kyle on 1/10/2016.
 */
import React from 'react';
import { render } from 'react-dom';
import App from './Containers/App';

'use strict';

const actionEvents = {
  "left": {
    className: "action-work",
    actionColor: "#004070",
    text: "Work",
    action: ()=>{alert("left action")},
  },
  "right": {
    className: "action-delete",
    actionColor: "#CC0000",
    text: "Delete",
    action: ()=>{alert("right action")},
  }
};

const listItems = [{
  text: "Text"
}, {
  text: "Random"
}];

render(<App
  actionEvents={actionEvents}
  listItems={listItems}
/>, document.getElementById("root"));

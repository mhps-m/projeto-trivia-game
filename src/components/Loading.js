import React, { Component } from 'react';
import '../styles/loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loadingspinner">
        <div id="square1" />
        <div id="square2" />
        <div id="square3" />
        <div id="square4" />
        <div id="square5" />
      </div>
    );
  }
}

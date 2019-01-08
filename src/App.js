import React, { Component } from 'react';
import './App.css';
import ControlPanel from "components/ControlPanel/ControlPanel";

class App extends Component {
  render() {
    return (
      <div className="App">
          <ControlPanel/>
      </div>
    );
  }
}

export default App;

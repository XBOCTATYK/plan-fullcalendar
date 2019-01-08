import React, { Component } from 'react';
import './App.css';
import ControlPanel from "components/ControlPanel/ControlPanel";
import { controlPanelEntity } from "entities/controlPanel";
import DaysList from "components/DaysList/DaysList";

let ControlPanelParams = new controlPanelEntity();

class App extends Component {
  render() {
    return (
      <div className="App">
          <ControlPanel filterParams={ControlPanelParams}/>
          <DaysList startDate={new Date(Date.now())} daysCount={ControlPanelParams.days} />
      </div>
    );
  }
}

export default App;

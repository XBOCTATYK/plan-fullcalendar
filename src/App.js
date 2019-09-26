import React, { Component } from 'react';
import './App.css';
import MainComponent from 'components/MainComponent/MainComponent';
import withThemeParams from 'components/HOC/withThemeParams';
import withNotifies from 'components/HOC/withNotifies';
import SnackNotifier from 'components/Notifiers/SnackNotifier';


class App extends Component {

    render() {

    const PlanComponent = withNotifies(MainComponent, SnackNotifier);

    return (
      <div className="App">
          <PlanComponent controlPanelParams={this.props.controlPanelParams}/>
      </div>
    );
  }
}

export default App;

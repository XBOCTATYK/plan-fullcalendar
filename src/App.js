import React, { Component } from 'react';
import './App.css';
import ControlPanel from "components/ControlPanel/ControlPanel";
import { controlPanelEntity } from "entities/controlPanel";
import DaysList from "components/DaysList/DaysList";
import { PlanItemCollectionMobx, PlanItemMobx  } from "entities/planItems";
import PlanItemsData from "startData/planItems";
import { getMonday } from "services/helper";

let ControlPanelParams = new controlPanelEntity();
let PlanItemsCollection = new PlanItemCollectionMobx();



class App extends Component {

    componentWillMount() {
        PlanItemsData.itemsId.forEach((item, index) => {
            PlanItemsCollection.addItem(PlanItemsData.items[item], item);
        })
    }

  render() {
        console.log(PlanItemsCollection);
    return (
      <div className="App">
          <ControlPanel filterParams={ControlPanelParams}/>
          <DaysList planItemsIds={PlanItemsCollection.itemIds} planItems={PlanItemsCollection.items} startDate={getMonday(new Date(Date.now()))} daysCount={ControlPanelParams.days} />
      </div>
    );
  }
}

export default App;

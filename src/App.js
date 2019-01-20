import React, { Component } from 'react';
import './App.css';
import ControlPanel from "components/ControlPanel/ControlPanel";
import { controlPanelEntity } from "entities/controlPanel";
import DaysList from "components/DaysList/DaysList";
import { PlanItemCollectionMobx, PlanItemMobx  } from "entities/planItems";
import PlanItemsData from "startData/planItems";
import { getMonday } from "services/helper";
import ModalWindow from "components/ModalWindow/ModalWindow";
import { ModalItemEntity } from 'entities/ui';
import CreatePlanItem from 'components/Forms/CreatePlanItem/CreatePlanItem';

let ControlPanelParams = new controlPanelEntity();
let PlanItemsCollection = new PlanItemCollectionMobx();
let ModalStatus = new ModalItemEntity();

export let appUi = React.createContext({modal: ModalStatus});


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
              <appUi.Provider value={{modal: ModalStatus}}>
                  <DaysList
                      planItemsIds={PlanItemsCollection.itemIds}
                      planItems={PlanItemsCollection.items}
                      startDate={getMonday(new Date(Date.now()))}
                      daysCount={ControlPanelParams.days} />
              </appUi.Provider>
          <ModalWindow status={ModalStatus}>
              <CreatePlanItem/>
          </ModalWindow>
      </div>
    );
  }
}

export default App;

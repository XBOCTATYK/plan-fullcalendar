import React, { Component } from 'react';
import './App.css';
import ControlPanel from "components/ControlPanel/ControlPanel";
import { controlPanelEntity } from "entities/controlPanel";
import DaysList from "components/DaysList/DaysList";
import { PlanItemCollectionMobx } from "entities/planItems";
import { getMonday } from "services/helper";
import ModalWindow from "components/ModalWindow/ModalWindow";
import { ModalItemEntity } from 'entities/ui';
import CreatePlanItem from 'components/Forms/CreatePlanItem/CreatePlanItem';
import appParams from 'startData/app.json';
import { observer } from "mobx-react";
import GetData from 'services/GetData';
import ByJSON from 'dataSource/ByJSON';


let ControlPanelParams = new controlPanelEntity();
let PlanItemsCollection = new PlanItemCollectionMobx();
let ModalStatus = new ModalItemEntity();

ModalStatus.setParams(appParams);

export let appUi = React.createContext({modal: ModalStatus});


const App = observer(class AppClass extends Component {

    componentWillMount() {

        let DataSource = new ByJSON('planItems');
        let FetchData = new GetData(DataSource);

        FetchData.get().then((result) => {
            result.itemsId.forEach((item) => {
                PlanItemsCollection.addItem(result.items[item], item);
            })
        });


    }

  render() {
    return (
      <div className="App">
          <ControlPanel filterParams={ControlPanelParams}/>
              <appUi.Provider value={{modal: ModalStatus}}>
                  <DaysList
                      planItemsIds={PlanItemsCollection.itemIds}
                      planItems={PlanItemsCollection.items}
                      daysCount={ControlPanelParams.days} />
              </appUi.Provider>
          <ModalWindow status={ModalStatus}>
              <CreatePlanItem
                  planItemsCollection={PlanItemsCollection}
                  cancel={() => {ModalStatus.makeInvisible()}}
                  params={ModalStatus.params}
              />
          </ModalWindow>
      </div>
    );
  }
});

export default App;

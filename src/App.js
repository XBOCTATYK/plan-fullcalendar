import React, { Component } from 'react';
import './App.css';
import ControlPanel from 'components/ControlPanel/ControlPanel';
import { controlPanelEntity } from "entities/controlPanel";
import { PlanItemCollectionMobx } from "entities/planItems";
import ModalWindow from "components/ModalWindow/ModalWindow";
import { ModalItemEntity } from 'entities/ui';
import CreatePlanItem from 'components/Forms/CreatePlanItem/CreatePlanItem';
import appParams from 'startData/app.json';
import { observer } from "mobx-react";
import {CalendarApiDistributor} from 'entities/calendarApiDistributor';
import EventsOperationsLogic from 'components/EventsOperationsLogic/EventsOperationsLogic';
import EventModel from 'RestModels/EventModel';


let ControlPanelParams = new controlPanelEntity();
let PlanItemsCollection = new PlanItemCollectionMobx();
let ModalStatus = new ModalItemEntity();

ModalStatus.setParams(appParams);

export let appUi = React.createContext({modal: ModalStatus});


const App = observer(class AppClass extends Component {


    componentWillMount() {
        const Events = new EventModel();

        Events.getAll(ControlPanelParams.user, 20).then((result) => {
            this.setState({items: result.items}, () => {
                window.dispatchEvent(new Event('resize'));
            });
        });

    }

    state = {
        items: [],
        apiCollection: CalendarApiDistributor.getInstance()
    };

  render() {
    return (
      <div className="App">
          <ControlPanel filterParams={ControlPanelParams}/>
              <appUi.Provider value={{modal: ModalStatus}}>
                  {
                      this.state.items.length &&
                      <EventsOperationsLogic
                          items={this.state.items}
                          daysCount={ControlPanelParams.days}
                          modalControl={ModalStatus}
                      />
                  }
              </appUi.Provider>
          <ModalWindow status={ModalStatus}>
              <CreatePlanItem
                  planItemsCollection={PlanItemsCollection}
                  cancel={() => {ModalStatus.makeInvisible()}}
                  params={ModalStatus.params}
                  successCallback={ModalStatus.successCallback}
                  cancelCallback={ModalStatus.cancelCallback}
              />
          </ModalWindow>
      </div>
    );
  }
});

export default App;

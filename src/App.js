import React, { Component } from 'react';
import './App.css';
import ControlPanel from 'components/ControlPanel/ControlPanel';
import { PlanItemCollectionMobx } from "entities/planItems";
import ModalWindow from "components/ModalWindow/ModalWindow";
import { ModalItemEntity } from 'entities/ui';
import CreatePlanItem from 'components/Forms/CreatePlanItem/CreatePlanItem';
import appParams from 'startData/app.json';
import { observer } from "mobx-react";
import {CalendarApiDistributor} from 'entities/calendarApiDistributor';
import EventsOperationsLogic from 'components/EventsOperationsLogic/EventsOperationsLogic';
import EventModel from 'RestModels/EventModel';
import {zoneList} from 'config/app.config';


let PlanItemsCollection = new PlanItemCollectionMobx();

let ModalStatus = new ModalItemEntity();
ModalStatus.setParams(appParams);
export let appUi = React.createContext({modal: ModalStatus});


const App = observer(class AppClass extends Component {
    componentWillMount() {
        const Events = new EventModel();

        Events.getAll(this.props.controlPanelParams.user, 20).then((result) => {
            this.setState({items: result.items}, () => {
                window.dispatchEvent(new Event('resize'));
                this.forceUpdate()
            });
        });

    }

    state = {
        items: [],
        items2: [],
        splitMode: false,
        apiCollection: CalendarApiDistributor.getInstance()
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        const {controlPanelParams} = this.props;
        if (controlPanelParams.splitCalendar && !this.state.items2.length) {
            const Events = new EventModel();

            Events.getAll(controlPanelParams.user2, 20).then((result) => {
                this.setState({items2: result.items, splitMode: true}, () => {
                    //window.dispatchEvent(new Event('resize'));
                });
            });
        }
    }

    render() {
    return (
      <div className="App">
          <ControlPanel filterParams={this.props.controlPanelParams}/>
              <appUi.Provider value={{modal: ModalStatus}}>
                  <div className="flex">
                  {
                      this.state.items.length &&
                          <div className="flex-container">
                              <EventsOperationsLogic
                                  userId={this.props.controlPanelParams.user}
                                  zones={zoneList}
                                  items={this.state.items}
                                  daysCount={this.props.controlPanelParams.days}
                                  modalControl={ModalStatus}
                              />
                          </div>
                  }

                  {
                      (this.state.items2.length && this.props.controlPanelParams.splitCalendar) &&
                      <div className="flex-container">
                          <EventsOperationsLogic
                              userId={this.props.controlPanelParams.user2}
                              zones={zoneList}
                              items={this.state.items2}
                              daysCount={this.props.controlPanelParams.days}
                              modalControl={ModalStatus}
                          />
                      </div>
                  }
                  </div>
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

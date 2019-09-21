import React, { Component } from 'react';
import './App.css';
import ControlPanel from "components/ControlPanel/ControlPanel";
import { controlPanelEntity } from "entities/controlPanel";
import CalendarController from "components/CalendarController/CalendarController";
import { PlanItemCollectionMobx } from "entities/planItems";
import { getMonday } from "services/helper";
import ModalWindow from "components/ModalWindow/ModalWindow";
import { ModalItemEntity } from 'entities/ui';
import CreatePlanItem from 'components/Forms/CreatePlanItem/CreatePlanItem';
import appParams from 'startData/app.json';
import { observer } from "mobx-react";
import GetData from 'services/GetData';
import ByJSON from 'dataSource/ByJSON';
import {CalendarApiDistributor} from 'entities/calendarApiDistributor';


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
            this.setState({items: result.items});
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
                  <div className={'flex'}>
                      <div className={'flex-container'}>
                          <CalendarController
                              planItems={this.state.items}
                              daysCount={ControlPanelParams.days}
                              calendarName={'productive_dev1'}
                              hours={5}
                              showHeader
                          />
                      </div>
                      <div className={'flex-container'}>
                          <CalendarController
                              planItems={this.state.items}
                              daysCount={ControlPanelParams.days}
                              calendarName={'productive_dev2'}
                              hours={5}
                              showHeader
                          />
                      </div>
                  </div>
                  <h3>Оценки</h3>
                  <div className={'flex'}>
                      <div className={'flex-container'}>
                          <CalendarController
                              planItems={this.state.items}
                              daysCount={ControlPanelParams.days}
                              calendarName={'estimate_dev1'}
                              hours={2}
                          />
                      </div>
                      <div className={'flex-container'}>
                          <CalendarController
                              planItems={this.state.items}
                              daysCount={ControlPanelParams.days}
                              calendarName={'estimate_dev2'}
                              hours={2}
                          />
                      </div>
                  </div>
                  <h3>Тех.долг</h3>
                  <div className={'flex'}>
                      <div className={'flex-container'}>
                          <CalendarController
                              planItems={this.state.items}
                              daysCount={ControlPanelParams.days}
                              calendarName={'techrent_dev1'}
                              hours={2}
                          />
                      </div>
                      <div className={'flex-container'}>
                          <CalendarController
                              planItems={this.state.items}
                              daysCount={ControlPanelParams.days}
                              calendarName={'techrent_dev2'}
                              hours={2}
                          />
                      </div>
                  </div>
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

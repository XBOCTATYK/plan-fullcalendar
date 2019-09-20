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
            this.setState({items: result.items}, () => {
                const stateItems = this.state.items;
                stateItems[0].start = '2019-09-18 10:30:00';
                stateItems[0].title = 'Изменилось!';
                stateItems.push({
                    "id": 6,
                    "userId": 55,
                    "title": "iss23440 : Запилить крутой сайт за 2 часа",
                    "start": "2019-09-19 12:00:00",
                    "end": "2019-09-19 12:30:00",
                    "timeChecked": 0,
                    "zone": "productive",
                    "taskId": 23443,
                    "date": "17.09.2019",
                    "projectName": "onlineconvertfree.com"
                });
                setTimeout(() => {
                    this.setState({items: stateItems, lol: 'fdf'})
                }, 2000)

            })
        });
    }

    state = {
        items: []
    };

  render() {
    return (
      <div className="App">
          <ControlPanel filterParams={ControlPanelParams}/>
              <appUi.Provider value={{modal: ModalStatus}}>
                  <DaysList
                      lol={this.state.lol}
                      planItems={this.state.items}
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

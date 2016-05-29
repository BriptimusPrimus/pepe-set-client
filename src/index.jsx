import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducer from './reducers'
import {requestUserData, receiveUserData} from './actions';

import MainArea from './containers/MainArea'; 
import config from '../config/config';
import pepeSetServ from './services/pepeSetServ';

const tableData = [
  {
    id: '10027',
    keyName: 'Pepe uno',
    type: 'soft token',
    active: false
  },
  {
    id: '11542',
    keyName: 'Pepe dos',
    type: 'hard token',
    active: false
  },
  {
    id: '42837',
    keyName: 'Pepe tres',
    type: 'google auth',
    active: true
  },
  {
    id: '45009',
    keyName: 'Pepe cuatro',
    type: 'google auth',
    active: false
  }
];

let store = createStore(reducer)

export default function startApp(environment) {
  console.log('INITIATE APP environment:', environment);

  const configuration = config(environment);
  console.log('configuration', configuration);

  const pepeSetService = pepeSetServ(configuration);

  ReactDOM.render(
    <Provider store={store}>
      <MainArea tableData={tableData}/>
    </Provider>,
    document.getElementById('app')
  );
  
  // trigger initial request to the server
  store.dispatch(requestUserData());
  
  console.log('state:', store.getState());
  
  pepeSetService.getUserAuthMethod()
    .then(function fullfilled(data) {
      store.dispatch(receiveUserData(data.userData));
      console.log('state:', store.getState());
    })
    .catch(function rejected(reason) {
      console.log('response error:', reason);
      console.log('state:', store.getState());
    })
}

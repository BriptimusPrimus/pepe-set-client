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

let store = createStore(reducer)

export default function startApp(environment) {
  console.log('INITIATE APP environment:', environment);

  const configuration = config(environment);
  console.log('configuration', configuration);

  const pepeSetService = pepeSetServ(configuration);

  ReactDOM.render(
    <Provider store={store}>
      <MainArea pepeSetService={pepeSetService}/>
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
      store.dispatch(receiveUserData(reason));
      console.log('response error:', reason);
      console.log('state:', store.getState());
    })
}

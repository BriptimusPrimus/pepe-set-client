import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import MainArea from './components/MainArea'; 

const data = [
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

ReactDOM.render(
  <MainArea data={data}/>,
  document.getElementById('app')
);
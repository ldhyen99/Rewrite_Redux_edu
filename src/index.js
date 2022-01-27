import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import StoreContainer from './Redux/storeContainer';
import { reducer } from './Redux/myReducers';
import { GeneralizedComponent } from './Redux/Components/GeneralizedComponent';
import './index.css';

let StoreContainedGeneralizedComponent = StoreContainer(GeneralizedComponent, {
  reducer,
});

ReactDOM.render(
  <React.StrictMode>
    <StoreContainedGeneralizedComponent myProp="foo" />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import store from '../Redux/createStore';
import { NoteApp } from './NoteApp';
import useReducerNote from '../Hook/useReducerNote';

export const GeneralizedComponent = () => {
  let props = useReducerNote();

  console.log(store.getState());

  return (
    <div className="App">
      <NoteApp {...props} />
    </div>
  );
};

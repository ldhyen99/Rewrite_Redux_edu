import React, { useState } from 'react';
import store from '../Redux/createStore';
import { NoteApp } from './NoteApp';

export const GeneralizedComponent = () => {
  const [notesState, setNotesState] = useState({});
  const [openNoteIdState, setOpenNoteIdState] = useState(NaN);

  const getDataFromRedux = () => {
    const { reducer } = store.getState() || {};
    const { notes, openNoteId } = reducer;
    setNotesState(notes);
    setOpenNoteIdState(openNoteId);
  };

  const handleStoreDispatch = (actionType, state) => {
    store.dispatch({
      type: actionType,
      payload: { ...state },
    });
    getDataFromRedux();
  };

  const onAddNote = () => {
    handleStoreDispatch('CREATE_NOTE');
  };

  const onChangeNote = (id, content) => {
    handleStoreDispatch('UPDATE_NOTE', { id, content });
  };

  const onOpenNote = (id) => {
    handleStoreDispatch('OPEN_NOTE', id);
  };

  const onCloseNote = () => {
    handleStoreDispatch('CLOSE_NOTE');
  };

  console.log({ openNoteIdState });
  console.log(store.getState());

  return (
    <div className="App">
      <NoteApp
        onAddNote={onAddNote}
        notes={notesState}
        openNoteId={openNoteIdState}
        onChangeNote={onChangeNote}
        onOpenNote={onOpenNote}
        onCloseNote={onCloseNote}
      />
    </div>
  );
};

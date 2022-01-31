import { useState } from 'react';
import store from '../Redux/createStore';

function useReducerNote() {
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

  return {
    notes: notesState,
    openNoteId: openNoteIdState,
    getDataFromRedux,
    handleStoreDispatch,
    onAddNote,
    onChangeNote,
    onOpenNote,
    onCloseNote,
  };
}

export default useReducerNote;

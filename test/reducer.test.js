import { reducer } from '../src/Redux/store/reducers';

describe('reducer', () => {
  it('returns a default state for an undefined existing state', () => {
    expect(reducer(undefined, {})).toEqual({
      nextNoteId: 1,
      notes: {},
      openNoteId: null,
    });
  });

  describe('CREATE_NOTE action', () => {
    const action = { type: 'CREATE_NOTE' };
    it('create note with nextNoteId is 1', () => {
      expect(reducer({ nextNoteId: 0 }, action)).toMatchObject({
        nextNoteId: 1,
        openNoteId: 0,
        notes: {
          0: {
            id: 0,
            content: '',
          },
        },
      });
    });
  });

  describe('UPDATE_NOTE action', () => {
    const payload = { id: 0, content: 'hello' };
    const action = { type: 'UPDATE_NOTE', payload };
    const data = {
      notes: {
        0: {
          id: 0,
          content: 'hello',
        },
      },
    };

    it('update notes with id & content', () => {
      expect(reducer(data, action)).toMatchObject({
        notes: {
          0: {
            id: 0,
            content: 'hello',
          },
        },
      });
    });
  });

  describe('OPEN_NOTE action', () => {
    const payload = { id: 1 };
    const action = { type: 'OPEN_NOTE', payload };

    it('update notes with id & content', () => {
      expect(reducer(undefined, action)).toMatchObject({ openNoteId: 1 });
    });
  });

  describe('CLOSE_NOTE action', () => {
    const action = { type: 'CLOSE_NOTE' };

    it('update notes with id & content', () => {
      expect(reducer(undefined, action)).toMatchObject({ openNoteId: null });
    });
  });
});

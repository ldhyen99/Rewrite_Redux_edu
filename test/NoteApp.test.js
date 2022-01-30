import * as React from 'react';
import { shallow } from 'enzyme';
import { NoteTitle } from '../src/Components/NoteApp';

describe('NoteApp', () => {
  describe('NoteTitle', () => {
    it('renders with content props', () => {
      const note = {
        id: 0,
        content: 'hello',
      };
      const wrapper = shallow(<NoteTitle note={note} />);

      expect(wrapper.contains(<i>Untitled</i>)).toBe(false);
    });

    it('renders Untitled without title on content props', () => {
      const note = {
        id: 0,
        content: '',
      };
      const wrapper = shallow(<NoteTitle note={note} />);

      expect(wrapper.contains(<i>Untitled</i>)).toBe(true);
    });
  });
});

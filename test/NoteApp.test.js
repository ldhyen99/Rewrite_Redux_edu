import * as React from 'react';
import { shallow } from 'enzyme';
import {
  NoteLink,
  NoteTitle,
  NoteList,
  NoteEditor,
} from '../src/Components/NoteApp';

describe('NoteApp', () => {
  let wrapper;
  const onOpenNote = jest.fn();
  const onChangeNote = jest.fn();

  const rendersWithProps = (Component, checkProps, content, params) => {
    let props = {};

    if (checkProps === 'note') {
      props = {
        note: {
          id: 0,
          content: content || '',
        },
        onOpenNote: params?.onOpenNote ?? null,
        onChangeNote: params?.onChangeNote ?? null,
      };
    } else if (checkProps === 'notes') {
      props = {
        notes: { ...params?.notesData } || {},
        onOpenNote: false,
      };
    }

    wrapper = shallow(<Component {...props} />);
  };

  afterEach(() => {
    onOpenNote.mockClear();
    onChangeNote.mockClear();
  });

  describe('NoteTitle', () => {
    it('renders with content props', () => {
      let content = 'hello world';
      rendersWithProps(NoteTitle, 'note', content);
      expect(wrapper.contains(<span>{content}</span>)).toBe(true);
    });

    it('renders Untitled without title on content props', () => {
      rendersWithProps(NoteTitle, 'note');
      expect(wrapper.contains(<i>Untitled</i>)).toBe(true);
    });
  });

  describe('NoteLink', () => {
    it('renders li element', () => {
      rendersWithProps(NoteLink, 'note');
      expect(wrapper.find('li').length).toBe(1);
    });

    let clickTaga = () => {
      rendersWithProps(NoteLink, 'note', '', { onOpenNote });
      wrapper.find('a').simulate('click');
    };

    it('simulate onClick with tag a', () => {
      clickTaga();
      expect(onOpenNote).toHaveBeenCalled();
    });

    it('renders NoteTitle when tag a is clicked', () => {
      clickTaga();
      expect(wrapper.find(NoteTitle).length).toBe(1);
    });
  });

  describe('NoteList', () => {
    it('renders ul elm', () => {
      rendersWithProps(NoteList, 'notes');
      expect(wrapper.find('ul').length).toBe(1);
    });

    it('renders NoteLink component in the first time', () => {
      rendersWithProps(NoteList, 'notes');
      expect(wrapper.find(NoteLink).length).toBe(0);
    });

    it('renders NoteLink component when it have notes data', () => {
      let notesData = {
        0: {
          id: 0,
          content: 'hello',
        },
      };
      rendersWithProps(NoteList, 'notes', '', { notesData });
      expect(wrapper.find(NoteLink).length).toBe(1);
    });
  });

  describe('NoteEditor', () => {
    it('renders first div elm', () => {
      rendersWithProps(NoteEditor, 'note');
      expect(wrapper.find('div').first().length).toBe(1);
    });
    it('renders textarea elm', () => {
      rendersWithProps(NoteEditor, 'note');
      expect(wrapper.find('textarea').length).toBe(1);
    });

    it('renders button elm', () => {
      rendersWithProps(NoteEditor, 'note');
      expect(wrapper.find('button').length).toBe(1);
    });

    it('display value with textarea', () => {
      let value = 'Hi';
      rendersWithProps(NoteEditor, 'note', value, { onChangeNote });
      let textarea = wrapper.find('textarea');

      expect(textarea.prop('value')).toEqual(value);
    });

    it('onChange test', () => {
      rendersWithProps(NoteEditor, 'note', '', { onChangeNote });
      let textarea = wrapper.find('textarea');
      textarea.simulate('change', { target: 'hi' });

      expect(onChangeNote).toHaveBeenCalled();
    });
  });
});

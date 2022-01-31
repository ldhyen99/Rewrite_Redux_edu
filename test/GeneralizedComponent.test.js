import * as React from 'react';
import { shallow } from 'enzyme';

import { GeneralizedComponent } from '../src/Components/GeneralizedComponent';
import { NoteApp } from '../src/Components/NoteApp';

describe('GeneralizedComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GeneralizedComponent />);
  });

  it('renders with NoteApp', () => {
    expect(wrapper.find(NoteApp).length).toBe(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { Home } from '../home.component';


describe('Home: Component', () => {
  const defaultProps = {
    items: fromJS([{ name: 'name-1' }, { name: 'name-2' }, { name: 'name-3' }]),
    language: 'en',
    setLanguage: () => {},
    location: {},
    match: {},
    history: { push: () => {} },
  };

  const component = (props) => (
    <Home {...defaultProps} {...props} />
  );

  it('should render Home root', () => {
    const wrapper = shallow(component({}));
    global.expect(wrapper).toMatchSnapshot();
  });
});

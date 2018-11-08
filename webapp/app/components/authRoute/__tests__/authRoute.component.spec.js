import React from 'react';
import { shallow } from 'enzyme';
import { Map } from 'immutable';

import { AuthRoute } from '../authRoute.component';

describe('<AuthRoute />', () => {
  const defaultProps = {
    isAuthenticated: false,
    userProfile: Map(),
    location: {},
    hasInstalledApp: false,
  };

  const component = (props) => (
    <AuthRoute to="/some-route" {...defaultProps} {...props} />
  );

  it('should render default component tree', () => {
    const wrapper = shallow(component());
    global.expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Redirect /> to home page when user is authenticated but route requires anonymous', () => {
    const wrapper = shallow(component({ anonymous: true, isAuthenticated: true }));
    global.expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Redirect /> to login page if user is not authenticated', () => {
    const wrapper = shallow(component());
    global.expect(wrapper).toMatchSnapshot();
  });

  it('should render null when user is authenticated by user roles were not fetched yet', () => {
    const wrapper = shallow(component({ isAuthenticated: true }));
    global.expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Redirect /> to login page if user is archived', () => {
    const wrapper = shallow(component({
      userProfile: Map({
        name: 'John Doe',
        archived: true,
      }),
      isAuthenticated: true,
    }));
    global.expect(wrapper).toMatchSnapshot();
  });

  it('should render a real <Route /> when user is authenticated and is not archived', () => {
    const wrapper = shallow(component({
      userProfile: Map({
        name: 'John Doe',
      }),
      isAuthenticated: true,
    }));
    global.expect(wrapper).toMatchSnapshot();
  });

  it('should render a real <Route /> when user is not authenticated and route required anonymous user', () => {
    const wrapper = shallow(component({
      isAuthenticated: false,
      anonymous: true,
    }));
    global.expect(wrapper).toMatchSnapshot();
  });

  it('should render a <Redirect /> to defaultRedirect page', () => {
    const wrapper = shallow(component({
      isAuthenticated: false,
      anonymous: false,
      defaultRedirect: '/default-page',
    }));
    global.expect(wrapper).toMatchSnapshot();
  });
});

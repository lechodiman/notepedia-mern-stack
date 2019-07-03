import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Navbar } from "./Navbar";
import { NavItem } from "reactstrap";

configure({ adapter: new Adapter() });

describe("<Navbar />", () => {
  let wrapper;
  let auth;

  beforeEach(() => {
    auth = {
      isAuthenticated: false,
      loading: false
    };

    wrapper = shallow(<Navbar auth={auth} logout={() => {}} />);
  });

  it("should render two <NavItem /> if not authenticated", () => {
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });

  it("should render three <NavItem /> if authenticated", () => {
    auth = {
      isAuthenticated: true,
      loading: false
    };

    wrapper.setProps({ auth });

    expect(wrapper.find(NavItem)).toHaveLength(6);
  });

  it("should render the logout link if authenticated", () => {
    const auth = {
      isAuthenticated: true,
      loading: false
    };

    wrapper.setProps({ auth });

    expect(wrapper.contains(<i className="fas fa-sign-out-alt" />)).toEqual(
      true
    );
  });
});

import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Navbar from "./Navbar";
import { NavItem } from "reactstrap";

configure({ adapter: new Adapter() });

describe("<Navbar />", () => {
  let wrapper;

  beforeEach(() => {
    let auth = {
      isAuthenticated: false,
      loading: false
    };

    let logout = () => console.log("Logout");

    wrapper = shallow(<Navbar auth logout />);
  });

  it("should render two <NavItem /> if not authenticated", () => {
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });

  it("should render three <NavItem /> if authenticated", () => {
    let auth = {
      isAuthenticated: true,
      loading: false
    };

    let logout = () => console.log("Logout");

    wrapper = shallow(<Navbar auth logout />);

    expect(wrapper.find(NavItem)).toHaveLength(3);
  });

  it("should render the logout link if authenticated", () => {
    const auth = {
      isAuthenticated: true
    };

    wrapper.setProps({ auth });

    expect(
      wrapper.contains(
        <NavItem>
          <a href="#!" onClick={logout} className="nav-link">
            <i className="fas fa-sign-out-alt" />{" "}
            <span className="hide-sm">Logout</span>
          </a>
        </NavItem>
      )
    ).toEqual(true);
  });
});

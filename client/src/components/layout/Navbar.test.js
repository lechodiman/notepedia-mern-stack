import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Navbar from "./Navbar";
import { NavItem } from "reactstrap";
configure({ adapter: new Adapter() });

describe("<Navbar />", () => {
  it("should render two <NavItem /> if not authenticated", () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });
});

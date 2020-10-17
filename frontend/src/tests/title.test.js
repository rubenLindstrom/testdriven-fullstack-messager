import React from "react";
import Title from "../components/title";

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Title", () => {
  it("renders without crashing", () => {
    const component = mount(<Title />);
    expect(component).toMatchSnapshot();
  });
});

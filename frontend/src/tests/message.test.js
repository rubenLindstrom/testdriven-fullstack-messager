import React from "react";
import Message from "../components/message";
import Enzyme, { mount, shallow } from "enzyme";

import mockMessages from "../__mocks__/messages.json";

import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Message", () => {
  it("renders without crashing", () => {
    const component = mount(<Message {...mockMessages[0]} />);
    expect(component).toMatchSnapshot();
  });

  it("has a delete button", () => {
    const component = mount(<Message {...mockMessages[0]} />);
    expect(component.exists("button.delete")).toBe(true);
  });

  it("has an update button", () => {
    const component = mount(<Message {...mockMessages[0]} />);
    expect(component.exists("button.update")).toBe(true);
  });

  it("enters edit mode on update click", () => {
    const component = mount(<Message {...mockMessages[0]} loaded={true} />);
    component.find(".update").simulate("click");

    expect(component.find(".updateBox").text()).toBe("Hello");
    expect(component.find(".send").text()).toBe("Send Update");
  });
});

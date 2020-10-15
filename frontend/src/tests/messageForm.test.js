import React from "react";
import MessageForm from "../components/messageForm";

import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("MessageForm", () => {
  it("renders without crashing", () => {
    const component = mount(<MessageForm />);
    expect(component).toMatchSnapshot();
  });

  it("has textbox", () => {
    const component = mount(<MessageForm />);
    expect(component.exists("textarea#message_box")).toBe(true);
  });

  it("has submit button", () => {
    const component = mount(<MessageForm />);
    expect(component.exists("button#submit")).toBe(true);
  });

  it("should update state message when tesxt entered", () => {
    const component = shallow(<MessageForm />);
    component
      .find("textarea#message_box")
      .simulate("change", { target: { value: "Hello" } });
    expect(component.state("currentMessage")).toEqual("Hello");
  });

  it("clears message box on submit", () => {
    const component = mount(<MessageForm onSubmit={(item) => true} />);
    component
      .find("textarea#message_box")
      .simulate("change", { target: { value: "Hello" } });
    expect(component.state("currentMessage")).toEqual("Hello");
    component.find("form").simulate("submit");

    expect(component.find("textarea#message_box").props().value).toEqual("");
    expect(component.state("currentMessage")).toEqual("");
  });
});

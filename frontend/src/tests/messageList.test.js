import React from "react";
import MessageList from "../components/messageList";
import Enzyme, { mount, shallow } from "enzyme";

import mockMessages from "../__mocks__/messages.json";

import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("MessageList", () => {
  it("renders without crashing", () => {
    const component = mount(<MessageList />);
    expect(component).toMatchSnapshot();
  });

  it("takes messages as props and displays them", () => {
    const component = shallow(<MessageList messages={mockMessages} />);
    expect(component.find("ul#message_list").children().length).toBe(
      mockMessages.length
    );
  });
});

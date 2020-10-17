import React from "react";
import MessageApp from "../App";

import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import mockAxios from "../__mocks__/axios";
import errorMock from "../__mocks__/error.json";
import mockMessages from "../__mocks__/messages.json";

Enzyme.configure({ adapter: new Adapter() });

describe("MessageApp", () => {
  beforeEach(() => {
    mockAxios.post.mockImplementation(() => Promise.resolve({ data: [] }));
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({ data: mockMessages })
    );
    mockAxios.delete.mockImplementation(() => Promise.resolve({ data: [] }));
  });

  afterEach(() => {
    mockAxios.post.mockClear();
    mockAxios.get.mockClear();
    mockAxios.delete.mockClear();
  });

  it("renders without crashing", () => {
    const component = mount(<MessageApp />);
    expect(component).toMatchSnapshot();
  });

  it("has textbox", () => {
    const component = mount(<MessageApp />);
    expect(component.exists("#message_box")).toBe(true);
  });

  it("has submit button", () => {
    const component = mount(<MessageApp />);
    expect(component.exists("button#submit")).toBe(true);
  });

  it("has submit message list", () => {
    const component = mount(<MessageApp />);
    expect(component.exists("ul#message_list")).toBe(true);
  });

  it("posts data and clears message box on submit success", () => {
    const component = mount(<MessageApp />);
    const childComponent = component.find("MessageFormContainer");
    component
      .find("#message_box")
      .hostNodes()
      .simulate("change", {
        target: { value: "Hello" },
      });
    component.find("form").simulate("submit");

    expect(mockAxios.post).toHaveBeenCalledWith(
      "http://localhost:3001/message",
      { content: "Hello" }
    );
    expect(childComponent.state("currentMessage")).toEqual("");
  });

  it("loads data from API", () => {
    mount(<MessageApp />);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  it("removes message on delete", async () => {
    const component = await mount(<MessageApp />);
    await component.update();
    await component
      .find("ul#message_list")
      .childAt(0)
      .find(".delete")
      .at(0)
      .simulate("click");
    await component.update();

    expect(
      mockAxios.delete
    ).toHaveBeenCalledWith("http://localhost:3001/delete/1", { id: 1 });
  });

  it("updates message on update", async () => {
    const component = await mount(<MessageApp />);
    await component.update();
    await component
      .find("ul#message_list")
      .childAt(0)
      .find(".update")
      .at(0)
      .simulate("click");

    expect(
      component.find("ul#message_list").childAt(0).find(".send").at(0).text()
    ).toBe("Send Update");

    component
      .find("ul#message_list")
      .childAt(0)
      .find(".send")
      .at(0)
      .simulate("click");

    expect(mockAxios.put).toHaveBeenCalledWith(
      "http://localhost:3001/update/1",
      { content: "Hello" }
    );
    expect(component.find("#message_box").hostNodes().text()).toEqual("");
  });
});

describe("MessageApp erroring", () => {
  beforeEach(() =>
    Object.values(mockAxios).forEach((cb) =>
      cb.mockImplementation(() => Promise.reject({ data: errorMock }))
    )
  );

  afterEach(() => Object.values(mockAxios).forEach((cb) => cb.mockClear()));

  it("loads err on GET err", async () => {
    const component = await mount(<MessageApp />);
    await component.update();

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(component.state().error).toEqual({
      data: "error text from json mock",
    });
    expect(component.find("#error").text()).toBe(
      "Error: error text from json mock"
    );
  });

  it("loads err on POST err", async () => {
    const component = mount(<MessageApp />);
    component
      .find("#message_box")
      .hostNodes()
      .simulate("change", { target: { value: "bad string" } });
    await component.find("form").simulate("submit");
    await component.update();

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(component.state("error")).toEqual({
      data: "error text from json mock",
    });
    expect(component.find("#error").text()).toBe(
      "Error: error text from json mock"
    );
  });

  it("loads err on DELETE err", async () => {
    const component = await mount(<MessageApp />);
    component.setState({ messages: mockMessages, loaded: true });
    await component.update();
    await component
      .find("ul#message_list")
      .childAt(0)
      .find(".delete")
      .at(0)
      .simulate("click");
    await component.update();
    expect(component.state("error")).toEqual({
      data: "error text from json mock",
    });
    expect(component.find("#error").text()).toBe(
      "Error: error text from json mock"
    );
  });

  it("loads err on UPDATE err", async () => {
    const component = await mount(<MessageApp />);
    component.setState({
      messages: mockMessages,
      loaded: true,
    });
    await component.update();
    await component
      .find("ul#message_list")
      .childAt(0)
      .find(".update")
      .at(0)
      .simulate("click");

    expect(
      component.find("ul#message_list").childAt(0).find(".send").at(0).text()
    ).toBe("Send Update");

    component
      .find("ul#message_list")
      .childAt(0)
      .find(".send")
      .at(0)
      .simulate("click");

    expect(component.state("error")).toEqual({
      data: "error text from json mock",
    });
    expect(component.find("#error").text()).toBe(
      "Error: error text from json mock"
    );
  });
});

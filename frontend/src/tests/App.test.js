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
    expect(component.exists("textarea#message_box")).toBe(true);
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
    const childComponent = component.find("MessageForm");
    component.find("textarea#message_box").simulate("change", {
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
      .simulate("click");
    await component.update();

    expect(
      mockAxios.delete
    ).toHaveBeenCalledWith("http://localhost:3001/delete/1", { id: 1 });
  });
});

describe("MessageApp erroring", () => {
  beforeEach(() => {
    mockAxios.post.mockImplementation(() =>
      Promise.reject({ data: errorMock })
    );
    mockAxios.get.mockImplementation(() => Promise.reject({ data: errorMock }));
  });

  afterEach(() => {
    mockAxios.post.mockClear();
    mockAxios.get.mockClear();
  });

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
      .find("textarea#message_box")
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
});

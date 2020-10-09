import { expect } from "chai";
import MessageApp from "./app.js";

describe("app", () => {
	const testApp = new MessageApp();
	it("has messages", () => {
		expect(testApp.messages).to.be.an("array");
	});
});

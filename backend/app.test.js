import { expect } from "chai";
import MessageApp from "./app.js";

describe("app", () => {
	let testApp;

	beforeEach(() => {
		testApp = new MessageApp();
	});

	describe("app has messages", () => {
		beforeEach(() => {
			testApp.post("hi world");
		});

		it("has messages", () => {
			expect(testApp.messages).to.be.an("array");
		});

		it("app creates message (post)", () => {
			testApp.post("hi world");
			expect(testApp.messages.length).to.equal(2);
		});

		it("message has content, date, and id", () => {
			expect(testApp.messages[0].content).to.equal("hi world");
			expect(testApp.messages[0].date).not.to.equal(undefined);
			expect(testApp.messages[0].id).to.equal(1);
		});

		it("app reads (get)", () => {
			expect(testApp.get(1).content).to.equal("hi world");
		});

		it("app updates (update)", () => {
			testApp.update(1, "hello world");
			expect(testApp.get(1).content).to.equal("hello world");
		});

		it("app deletes (delete)", () => {
			testApp.delete(1);
			expect(testApp.messages.length).to.equal(0);
		});
	});

	it("id's are always unique", () => {
		testApp.post("1");
		testApp.post("2");
		testApp.delete(1);
		testApp.post("3");
		expect(testApp.messages[1].id).to.equal(3);
	});

	it("app deletes correctly", () => {
		testApp.post("1");
		testApp.post("2");
		testApp.post("3");
		testApp.delete(0);
		testApp.delete(2);

		expect(testApp.get(1).id).to.equal(1);
	});

	it("app updates correctly", () => {
		testApp.post("1");
		testApp.post("2");
		testApp.delete(1);
		testApp.update(2, "update");

		expect(testApp.get(2).content).to.equal("update");
	});
});

import request from "supertest";
import { expect } from "chai";

import MessageApp from "../app.js";

describe("Hello World test", () => {
	it("first test", (done) => {
		const res = request(MessageApp).get("/");
		res.expect({ val: "Hello world!" });
		res.expect(200, done);
	});
});

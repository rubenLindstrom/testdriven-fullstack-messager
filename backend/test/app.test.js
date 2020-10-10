import request from "supertest";
import { expect } from "chai";
import MessageApp from "../app.js";

describe("Message API endpoint tests", () => {
	it.only("gets from backends messages", (done) => {
		const res = request(MessageApp).get("/");
		res.expect([
			{
				content: "Hi",
				id: 1,
				date: "0001-01-00T00:00:00.00"
			}
		]);
		res.expect(200).end((err, res) => {
			if (err) return done(err);
			expect(res.body.length).to.equal(1);
			done();
		});
	});
});

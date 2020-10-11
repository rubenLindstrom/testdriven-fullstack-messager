import request from "supertest";
import { expect } from "chai";
import MessageApp from "../app.js";

describe("Message API endpoint tests", () => {
	it("posts a message", (done) => {
		const data = {
			content: "hi world"
		};
		const res = request(MessageApp)
			.post("/message")
			.send(data)
			.set("Accept", "application/json");
		res.expect(200).end((err, res) => {
			if (err) return done(err);
			expect(res.body[0].content).to.equal("hi world");
			done();
		});
	});

	it("gets a single message", (done) => {
		request(MessageApp)
			.get("/message/1")
			.expect(200)
			.end((err, res) => {
				if (err) done(err);
				expect(res.body.content).to.equal("hi world");
				done();
			});
	});

	it("updates a message", (done) => {
		const data = {
			content: "Hello World"
		};
		request(MessageApp)
			.put("/update/1")
			.send(data)
			.set("Accept", "application/json")
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				expect(res.body.content).to.equal("Hello World");
				done();
			});
	});

	it("gets from backends messages", (done) => {
		const res = request(MessageApp).get("/");
		res.expect(200).end((err, res) => {
			if (err) return done(err);
			expect(res.body.length).to.equal(1);
			done();
		});
	});

	it("deletes a message", (done) => {
		const res = request(MessageApp)
			.delete("/delete/1")
			.set("Accept", "application/json");
		res.expect(200).end((err, res) => {
			if (err) return done(err);
			expect(res.body.length).to.equal(0);
			done();
		});
	});
});

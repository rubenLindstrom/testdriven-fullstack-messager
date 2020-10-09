import fs from "fs";
import path from "path";

const getNewId = (arr) => (arr.length ? arr.slice(-1)[0].id + 1 : 1);

class MessageApp {
	constructor(filePath) {
		this.filePath = filePath;
		this.messages = filePath ? this.readFromJson() : [];
	}

	post(content) {
		this.messages.push({
			id: getNewId(this.messages),
			content,
			date: new Date()
		});
		return this.messages;
	}

	get(id) {
		return this.messages.find((el) => el.id === id);
	}

	update(id, content) {
		let newEl;
		this.messages = this.messages.map((el) =>
			el.id === id ? (newEl = { ...el, content }) : el
		);
		return newEl;
	}

	delete(id) {
		this.messages = this.messages.filter((el) => el.id !== id);
		return this.messages;
	}

	readFromJson() {
		return JSON.parse(
			fs.readFileSync(
				__dirname + path.normalize(this.filePath),
				"utf8",
				(err, data) => {
					if (err) throw err;
				}
			)
		);
	}
}

export default MessageApp;

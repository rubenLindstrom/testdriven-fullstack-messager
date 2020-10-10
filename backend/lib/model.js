import fs from "fs";
import path from "path";

const getNewId = (arr) => (arr.length ? arr.slice(-1)[0].id + 1 : 1);

class MessageApp {
	constructor(filePath) {
		this.filePath = filePath;
		this.messages = filePath ? this.readFromJson() : [];
	}

	post(content) {
		if (!content) return [];
		this.messages.push({
			id: getNewId(this.messages),
			content,
			date: new Date()
		});
		this.writeToJSON();
		return this.messages;
	}

	get(id) {
		return this.messages.find((el) => el.id === id);
	}

	getAll() {
		return this.messages;
	}

	update(id, content) {
		const idx = this.messages.findIndex((el) => el.id === id);
		if (idx === -1) return [];

		this.messages[idx].content = content;
		this.writeToJSON();
		return this.messages[idx];
	}

	delete(id) {
		const idx = this.messages.findIndex((el) => el.id === id);
		if (idx === -1) return "Message not found in database";

		this.messages.splice(idx, 1);
		this.writeToJSON();
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

	writeToJSON() {
		if (this.filePath)
			fs.writeFileSync(
				__dirname + path.normalize(this.filePath),
				JSON.stringify(this.messages),
				(err) => {
					if (err) throw err;
				}
			);
	}
}

export default MessageApp;

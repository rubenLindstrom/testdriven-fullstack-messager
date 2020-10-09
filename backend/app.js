class MessageApp {
	constructor() {
		this.messages = [];
	}

	post(content) {
		this.messages.push({
			id: this.messages.slice(-1)[0] + 1 || 0,
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
}

export default MessageApp;

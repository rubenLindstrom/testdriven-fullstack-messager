import MessageApp from "./model";

let messageApp;

const DB_PATH = {
	TEST: "////json///testMessages.json",
	PROD: "////json///messages.json"
};
const IS_TEST = process.env.npm_lifecycle_event === "test";

messageApp = new MessageApp(IS_TEST ? DB_PATH.TEST : DB_PATH.PROD);

export const getSingleMessage = (id) =>
	new Promise((resolve, reject) => {
		const message = messageApp.get(id);
		if (message) resolve(message);
		else reject("Message not found in database");
	});

export const getAll = () =>
	new Promise((resolve, reject) => {
		const messages = messageApp.getAll();
		console.log(messages.length);
		if (messages.length !== 0) resolve(messages);
		else reject("No messages in database");
	});

export const post = (content) =>
	new Promise((resolve, reject) => {
		const message = messageApp.post(content);
		if (message.length !== 0) resolve(message);
		else reject("You can't post an empty message");
	});

export const deleteMessage = (id) =>
	new Promise((resolve, reject) => {
		const result = messageApp.delete(id);
		if (result !== "Message not found in database") resolve(result);
		else reject(result);
	});

export const updateMessage = (id, content) =>
	new Promise((resolve, reject) => {
		const result = messageApp.update(id, content);
		if (result.length !== 0) resolve(result);
		else reject("Message not found in database");
	});

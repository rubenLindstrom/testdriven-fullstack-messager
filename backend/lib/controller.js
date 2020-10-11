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
		const result = messageApp.get(id);
		if (result !== []) resolve(result);
		else reject(result);
	});

export const getAll = () =>
	new Promise((resolve, reject) => {
		const result = messageApp.getAll();
		if (result !== []) resolve(result);
		else reject(result);
	});

export const post = (content) =>
	new Promise((resolve, reject) => {
		const message = messageApp.post(content);
		if (message !== []) resolve(message);
		else reject(message);
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
		if (result !== []) resolve(result);
		else reject(result);
	});

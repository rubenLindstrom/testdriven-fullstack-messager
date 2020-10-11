import MessageApp from "./model";

let messageApp;

const DB_PATH = {
	TEST: "////json///testMessages.json",
	PROD: "////json///messages.json"
};
const IS_TEST = process.env.npm_lifecycle_event === "test";

messageApp = new MessageApp(IS_TEST ? DB_PATH.TEST : DB_PATH.PROD);

const getAll = () =>
	new Promise((resolve, reject) => {
		const result = messageApp.getAll();
		if (result !== []) resolve(result);
		else reject(result);
	});

export { getAll };

import express from "express";
import MessageApp from "./lib/model";

const app = express();
let messageApp = new MessageApp("////json///testMessages.json");

app.get("/", async (req, res) => {
	let result = messageApp.getAll();
	res.json(result);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export default app;

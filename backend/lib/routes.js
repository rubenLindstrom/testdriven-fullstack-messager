import { Router } from "express";

const messageApp = require("./controller");
const router = Router();

router.get("/", async (req, res) => {
	await messageApp
		.getAll()
		.then((messages) => res.json(messages))
		.catch((err) => res.status(400).json(err));
});

export default router;

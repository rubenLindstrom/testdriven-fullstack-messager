import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.send({ val: "Hello world!" });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export default app;

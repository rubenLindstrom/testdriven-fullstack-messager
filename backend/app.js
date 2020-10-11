import express from "express";
import routes from "./lib/routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export default app;

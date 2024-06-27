const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);

app.use(cors({ origin: true, credentials: false }));

app.get("/", (req, res) => {
	res.json({ info: "Api en linea" });
});

app.listen(port, () => {
	console.log(`Aplicacion corriendo en el puerto ${port}.`);
	console.log(`Acceso: http://127.0.0.1:4000/`)
});

const db = require("./queries");

app.get("/check", db.check);
app.post("/saveUser", db.saveUser)


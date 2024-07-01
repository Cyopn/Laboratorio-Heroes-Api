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
	res.send({ info: "Api en linea" });
});

app.listen(port, () => {
	console.log(`App corriendo en el puerto ${port}.`);

});

const db = require("./queries");

app.get("/check", db.check);
app.post("/saveUser", db.saveUser)
app.post("/getLogin", db.getLogin)
app.get("/getSelfUser/:id", db.getSelfUser)
app.post("/updateUser", db.updateUser)
app.get("/getInputs", db.getInputs)
app.post("/addLend", db.addLend)
app.get("/getLends/:id", db.getLends)
app.get("/getLend/:id", db.getLend)
app.post("/getLoginAdmin", db.getLoginAdmin)
app.get("/getAllLendsE", db.getAllLendsE)
app.get("/updateLend/:id", db.updateLend)
app.get("/getAllLends", db.getAllLends)
app.get("/getUsers", db.getUsers)
app.get("/getUser/:id", db.getUser)

module.exports = app;
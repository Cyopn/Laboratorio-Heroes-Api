const pg = require("pg");
require("dotenv").config();
const { database_url } = process.env;





const check = async (req, res) => {
    try {
        const client = new pg.Client({
            connectionString: database_url,
            application_name: "$nose",
        });
        await client.connect();
        let result = await client.query(`SELECT NOW()`);
        await client.end();
        res.send(result);
    } catch (e) {
        console.log(`Error: ${e}`);
    }
};

const saveUser = async (req, res) => {
    try {
        const client = new pg.Client({
            connectionString: database_url,
            application_name: "$nose",
        });

        const {
            matricula,
            nombre,
            apellidos,
            username,
            numero,
            password,
            turno,
            grupo,
        } = req.body;
        await client.connect();
        let result = await client.query(
            `INSERT INTO usuario (matricula, nombre, apellidos, username, numero, password, repeatPassword, turno, grupo) VALUES ('${matricula}', '${nombre}', '${apellidos}', '${username}', '${numero}', '${password}', '${repeatPassword}', '${turno}', '${grupo}')`
        );

        res.sendStatus(200);
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

module.exports = { check, saveUser }
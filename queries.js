const pg = require("pg");
require("dotenv").config();
const { database_url } = process.env;

const check = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        await client.connect();
        let result = await client.query(`SELECT NOW()`);
        res.send({ status: 200, result: result.rows[0].now });
    } catch (e) {
        console.log(`Error: ${e}`);
    }
    await client.end();
};

const saveUser = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        const { matricula, nombre, username, apellidos, numero, password, selectedOption, departamento, grupo, turno, admin } = req.body;
        await client.connect();
        await client.query(`INSERT INTO usuario (matricula, nombre, username, apellidos, movil, contraseña, cargo, departamento, grupo, turno, admin) VALUES ('${matricula}', '${nombre}', '${username}', '${apellidos}', '${numero}', '${password}', '${selectedOption}', '${departamento}', '${grupo}', '${turno}', '${admin}')`);
        res.send({ status: 200 });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.send({ status: 500 });
    }
    await client.end();
}

const getLogin = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        const { username, password } = req.body;
        await client.connect();
        let result = await client.query(`SELECT * FROM usuario WHERE username = '${username}' AND contraseña = '${password}'`);
        await client.end();
        if (result.rows.length == 0) {
            res.send({ status: 404 });
        } else {
            res.send({ status: 200, data: { id: result.rows[0].id_usuario, nombre: result.rows[0].nombre } });
        }
    } catch (e) {
        console.log(`Error: ${e}`);
    }
    await client.end();
};

const getSelfUser = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        const id = req.params.id;
        await client.connect();
        let result = await client.query(`SELECT * FROM usuario WHERE id_usuario = '${id}'`);
        await client.end();
        if (result.rows.length == 0) {
            res.send({ status: 404 });
        } else {
            res.send({ status: 200, result: result.rows[0] });
        }
    } catch (e) {
        console.log(`Error: ${e}`);
    }
    await client.end();
};

const updateUser = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        const { id, matricula, nombre, username, apellidos, numero, password, cargo, departamento, grupo, turno } = req.body;
        await client.connect();
        await client.query(`UPDATE usuario SET matricula = ${matricula}, nombre = '${nombre}', username = '${username}', apellidos = '${apellidos}', movil = ${numero}, contraseña = '${password}', cargo = '${cargo}', departamento = '${departamento}', grupo = '${grupo}', turno = '${turno}' WHERE id_usuario = '${id}'`);
        res.send({ status: 200 });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.send({ status: 500 });
    }
    await client.end();
}

const getInputs = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        await client.connect();
        let result = await client.query(`SELECT * FROM insumo`);
        res.send({ status: 200, result: result.rows });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.send({ status: 500 });
    }
    await client.end();
}

const addLend = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        const { id, entrega, devolucion, data } = req.body;
        const inputs = await checkInputs(data);
        if (inputs) {
            await client.connect();
            await client.query(`INSERT INTO prestamo (id_usuario, fecha_entrega, fecha_devolucion, estado) VALUES ('${id}', '${entrega}', '${devolucion}', 'entregado')`);
            let result = await client.query(`SELECT id_prestamo FROM prestamo ORDER BY id_prestamo DESC LIMIT 1`);
            let id_prestamo = result.rows[0].id_prestamo;
            const save = await saveLend(id_prestamo, data, client)
            if (save) {
                res.send({ status: 200, result: "Prestamo guardado." });
            } else {
                res.send({ status: 500, result: "Error al guardar el prestamo." });
            }
        } else {
            res.send({ status: 200, result: "No hay suficientes insumos disponibles" })
        }
    } catch (e) {
        console.log(`Error: ${e}`);
        res.send({ status: 500 });
    }
    await client.end();
}

const checkInputs = async (inputs) => {
    let ctrl = true
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        await client.connect();
        let result = await client.query(`SELECT * FROM insumo WHERE estado = 'libre'`);
        let names = [];
        let can = []
        let namesrs = [];
        let canrs = []
        inputs.forEach((input) => {
            if (names.includes(input.id_equipo)) {
                can[names.indexOf(input.nombre)] += parseInt(input.cantidad);
            } else {
                names.push(input.id_equipo);
                can.push(parseInt(input.cantidad));
            }
        })
        result.rows.forEach((input) => {
            if (!names.includes(input.nombre)) return
            if (namesrs.includes(input.nombre)) {
                canrs[namesrs.indexOf(input.nombre)] += 1;
            } else {
                namesrs.push(input.nombre);
                canrs.push(1);
            }
        })
        let idx = 0
        while (ctrl && idx < names.length) {
            if (can[names.indexOf(names[idx])] > canrs[namesrs.indexOf(namesrs[idx])]) {
                ctrl = false
            }
            idx++
        }
    } catch (e) {
        console.log(`Error: ${e}`);
    }
    await client.end();
    return ctrl
}

const saveLend = async (id_prestamo, data, client) => {
    let result = false
    try {
        data.forEach(async (input) => {
            for (let i = 0; i < input.cantidad; i++) {
                const lastInput = await client.query(`SELECT id_insumo FROM insumo WHERE nombre = '${input.id_equipo}' AND estado = 'libre'`);
                await client.query(`UPDATE insumo SET estado = 'prestado' WHERE id_insumo = '${lastInput.rows[0].id_insumo}'`);
            }
            await client.query(`INSERT INTO prestamo_insumo (id_prestamo, nombre, cantidad) VALUES ('${id_prestamo}', '${input.id_equipo}', '${input.cantidad}')`);
        });
        result = true
    } catch (e) {
        console.log(`Error: ${e}`);
    }
    return result
}

const getLends = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        const id_usuario = req.params.id;
        await client.connect();
        let result = await client.query(`SELECT * FROM prestamo WHERE id_usuario = '${id_usuario}' AND estado = 'entregado'`);
        const lend = result.rows
        let prestamos = await client.query(`SELECT * FROM prestamo_insumo`);
        const inpt = prestamos.rows
        let inputs = await client.query(`SELECT * FROM insumo WHERE nombre = '${prestamos.rows[0].nombre}'`);
        const inpts = inputs.rows
        const rs = await fixInputs(lend, inpt, inpts)
        res.send({ status: 200, result: rs });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.send({ status: 500 });
    }
    await client.end();
}

const getAllLendsE = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        await client.connect();
        let result = await client.query(`SELECT * FROM prestamo WHERE estado = 'entregado'`);
        const lend = result.rows
        let prestamos = await client.query(`SELECT * FROM prestamo_insumo`);
        const inpt = prestamos.rows
        let inputs = await client.query(`SELECT * FROM insumo WHERE nombre = '${prestamos.rows[0].nombre}'`);
        const inpts = inputs.rows
        const rs = await fixInputs(lend, inpt, inpts)
        res.send({ status: 200, result: rs });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.send({ status: 500 });
    }
    await client.end();
}

const getAllLends = async (req, res) => {
    try {
        const client = new pg.Client({
            connectionString: database_url,
            application_name: "$nose",
        });
        await client.connect();
        let result = await client.query(`SELECT * FROM prestamo`);
        const lend = result.rows
        let prestamos = await client.query(`SELECT * FROM prestamo_insumo`);
        const inpt = prestamos.rows
        let inputs = await client.query(`SELECT * FROM insumo WHERE nombre = '${prestamos.rows[0].nombre}'`);
        const inpts = inputs.rows
        const rs = await fixInputs(lend, inpt, inpts)
        res.send({ status: 200, result: rs });
        await client.end();
    } catch (e) {
        console.log(`Error: ${e}`);
        res.send({ status: 500 });
    }
}

const fixInputs = async (lend, input) => {
    let result = []
    let id = []
    lend.forEach((l) => {
        if (!id.includes(l.id_prestamo)) {
            let rs = []
            input.forEach((i) => {
                if (l.id_prestamo === i.id_prestamo) {
                    rs.push({ nombre: i.nombre, cantidad: i.cantidad })
                }
            })
            if (rs.length > 0) {
                result.push({ id_prestamo: l.id_prestamo, fecha_entrega: l.fecha_entrega, fecha_devolucion: l.fecha_devolucion, estado: l.estado, insumos: rs })
            }
        } else {
            id.push(l.id_prestamo)
        }

    })
    return result
}

const getLend = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        const id_prestamo = req.params.id;
        await client.connect();
        let result = await client.query(`SELECT * FROM prestamo WHERE id_prestamo = '${id_prestamo}'`);
        const lend = result.rows
        let prestamos = await client.query(`SELECT * FROM prestamo_insumo WHERE id_prestamo = '${id_prestamo}'`);
        const inpt = prestamos.rows
        let inputs = await client.query(`SELECT * FROM insumo WHERE nombre = '${prestamos.rows[0].nombre}'`);
        const inpts = inputs.rows
        const rs = await fixInputs(lend, inpt, inpts)
        res.send({ status: 200, result: rs });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.send({ status: 500 });
    }
    await client.end();
}

const getLoginAdmin = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        const { username, password } = req.body;
        await client.connect();
        let result = await client.query(`SELECT * FROM usuario WHERE username = '${username}' AND contraseña = '${password}'`);
        await client.end();
        if (result.rows.length == 0) {
            res.send({ status: 404 });
        } else {
            res.send({ status: 200, data: { id: result.rows[0].id_usuario, nombre: result.rows[0].nombre, admin: result.rows[0].admin } });
        }
    } catch (e) {
        console.log(`Error: ${e}`);
    }
    await client.end();
}

const getUsers = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        await client.connect();
        let result = await client.query(`SELECT * FROM usuario`);
        res.send({ status: 200, result: result.rows });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.send({ status: 500 });
    }
    await client.end();
}

const getUser = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        const id = decodeURI(req.params.id);
        await client.connect();
        let result = await client.query(`SELECT * FROM usuario WHERE matricula = '${id}'`);
        res.send({ status: 200, result: result.rows[0] });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.send({ status: 500 });
    }
    await client.end();
}

const updateLend = async (req, res) => {
    const client = new pg.Client({
        connectionString: database_url,
        application_name: "$nose",
    });
    try {
        const id = req.params.id;
        await client.connect();
        let result = await client.query(`SELECT * FROM prestamo_insumo WHERE id_prestamo = '${id}'`);
        const inputs = result.rows
        await updateInputs(inputs, client)
        await client.query(`UPDATE prestamo SET estado = 'devuelto' WHERE id_prestamo = '${id}'`);
        res.send({ status: 200, result: "Prestamo devuelto." });
    } catch (e) {
        console.log(`Error: ${e}`);
        res.send({ status: 500 });
    }
    await client.end();
}

const updateInputs = async (inputs, client) => {
    if (inputs.length > 0) {
        await updateInput(inputs[0], client)
        inputs.shift()
        await updateInputs(inputs, client)
    }
}

const updateInput = async (input, client) => {
    if (parseInt(input.cantidad) > 0) {
        await client.query(`UPDATE insumo SET estado = 'libre' WHERE nombre = '${input.nombre}' AND estado = 'entregado'`);
        input.cantidad = parseInt(input.cantidad) - 1;
        await updateInput(input, client)
    }
}

module.exports = { check, saveUser, getLogin, getSelfUser, updateUser, getInputs, addLend, getLends, getLend, getLoginAdmin, getAllLendsE, updateLend, getAllLends, getUsers, getUser }
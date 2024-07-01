const request = require('supertest');
const app = require('../main');

/* describe('API', () => {
    it('Debería devolver el estado 200 en la ruta raíz', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('info');
        console.log(res.body);
    });
}); */

/* describe('Obtener usuarios', () => {
    it('Debería devolver el estado 200 en la ruta /getUsers', async () => {
        const res = await request(app).get('/getUsers');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(200)
        expect(res.body.result).toBeInstanceOf(Array);
        console.log(res.body.result.length);
    });
}) */

describe('Obtener insumos', () => {
    it('Debería devolver el estado 200 en la ruta /getInputs', async () => {
        const res = await request(app).get('/getInputs');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(200)
        expect(res.body.result).toBeInstanceOf(Array);
        console.log(res.body.result.length);
    });
})
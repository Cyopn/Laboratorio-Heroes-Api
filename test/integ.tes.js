const request = require('supertest');
const app = require('../main');

describe('Guardar prestamo', () => {
    it('Deberia devolver el estado 200 en la ruta /addLend', async () => {
        const res = await request(app).post('/addLend').send({
            id: '981350720574685185',
            entrega: '2024-07-01T18:52:32.578Z',
            devolucion: '2024-07-09T00:00:00.000Z',
            data: [
                {
                    id_usuario: '981350720574685185',
                    id_equipo: 'Multimetro',
                    cantidad: '1'
                }
            ]
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(200)
        console.log(res.body.result);
    });
})

describe('Obtener prestamos por usuario', () => {
    it('Deberia devolver el estado 200 en la ruta /getLends', async () => {
        const res = await request(app).get('/getLends/981350720574685185');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status === 200 || res.body.status === 500).toBeTruthy()
        console.log(res.body);
    });
})

describe('Obtener todos los prestamos', () => {
    it('Deberia devolver el estado 200 en la ruta /getAllLends', async () => {
        const res = await request(app).get('/getAllLends');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status === 200 || res.body.status === 500).toBeTruthy()
        console.log(res.body);
    });
})
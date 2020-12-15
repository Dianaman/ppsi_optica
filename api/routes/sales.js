var express = require('express');
var router = express.Router();
const pool = require('../config');


router.get('/', (request, response) => {
    let query = 'SELECT p.*, f.*, u.email, u.nombre, u.apellido, u.celular, u.dni, p.idPedido as idPedido, ';
    query += 'p.monto as monto, f.monto as montoTotal, ';
    query += 'p.estado as estado, f.estado as estadoFactura, t.numero as numTarjeta, d.id as idDomicilio, d.* ';
    query += 'FROM pedidos as p ';
    query += 'LEFT JOIN users as u ON p.idUsuario = u.id ';
    query += 'LEFT JOIN facturas as f ON p.idPedido = f.idPedido ';
    query += 'LEFT JOIN tarjetas as t ON f.idTarjeta = t.idTarjeta ';
    query += 'LEFT JOIN direccion as d ON p.idDirEnvio = d.id ';
    query += 'ORDER BY p.estado DESC, p.fechaUltimaActualizacion DESC';

    pool.query(query, (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

router.get('/:id', (request, response) => {
    const id = request.params.id;

    let query = 'SELECT dp.*, p.*, f.* FROM detallePedidos as dp ';
    query += 'INNER JOIN productos as p ON dp.idProducto = p.idProducto ';
    query += 'LEFT JOIN facturas as f ON dp.idPedido = f.idPedido ';
    query += 'WHERE dp.idPedido = ' + id;

    pool.query(query, (error, result) => {
        if (error) throw error;
  
        response.send(result);
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const estado = req.body.estado;
    
    const values = [
        estado,
        id
    ];

    var sql = 'UPDATE pedidos ';
    sql += 'SET estado = ? ';
    sql += 'WHERE idPedido = ? ';

    pool.query(sql, values, (error, result) => {
        if (error) throw error;

        res.send(result);
    });
});

module.exports = router;

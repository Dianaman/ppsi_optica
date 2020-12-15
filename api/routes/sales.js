var express = require('express');
var router = express.Router();
const pool = require('../config');


router.get('/', (request, response) => {
    let query = 'SELECT p.*, f.*, u.email, u.nombre, u.apellido, p.idPedido as idPedido, ';
    query += 'p.monto as monto, f.monto as montoTotal, ';
    query += 'p.estado as estado, f.estado as estadoFactura ';
    query += 'FROM pedidos as p ';
    query += 'LEFT JOIN users as u ON p.idUsuario = u.id ';
    query += 'LEFT JOIN facturas as f ON p.idPedido = f.idPedido ';
    query += 'ORDER BY p.estado DESC, p.fechaUltimaActualizacion DESC';


    // let query = 'SELECT dp.*, p.*, f.*, u.email FROM detallePedidos as dp ';
    // query += 'INNER JOIN productos as p ON dp.idProducto = p.idProducto ';
    // query += 'LEFT JOIN facturas as f ON dp.idPedido = f.idPedido ';
    // query += 'LEFT JOIN users as u ON p.idUsuario = u.id ';
    // query += 'WHERE dp.idPedido = ' + orderId;

    pool.query(query, (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

router.get('/:id', (request, response) => {
    const id = request.params.id;

    // let query = 'SELECT dp.*, p.*, df.* FROM detallePedidos as dp ';
    // query += 'LEFT JOIN detalleFactura as df ON dp.idDetalleFactura = df.idDetalleFactura ';
    // query += 'LEFT JOIN productos as p ON dp.idProducto = p.idProducto ';
    // query += 'WHERE dp.idPedido = '+ id;

    let query = 'SELECT dp.*, p.*, f.* FROM detallePedidos as dp ';
    query += 'INNER JOIN productos as p ON dp.idProducto = p.idProducto ';
    query += 'LEFT JOIN facturas as f ON dp.idPedido = f.idPedido ';
    //query += 'INNER JOIN pedidos as ped ON dp.idPedido = ped.idPedido ';
    //query += 'INNER JOIN tarjetas as t ON ped.idUsuario = t.idUsuario ';
    query += 'WHERE dp.idPedido = ' + id;

    pool.query(query, (error, result) => {
        if (error) throw error;

        console.log("query detalle: ");
        console.log(query);
        console.log("result detalle: ");
        console.log(result);
  
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

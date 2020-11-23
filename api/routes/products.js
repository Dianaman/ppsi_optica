var express = require('express');
var router = express.Router();
const pool = require('../config');

/* GET users listing. */
router.get('/', (request, response) => {
  pool.query('SELECT * FROM productos', (error, result) => {
      if (error) throw error;

      response.send(result);
  });
});

router.post('/', (req, res) => {
    const producto = req.body.producto;
    console.log('producto', producto);
    const values = [
        producto.idCategoria,
        producto.articulo,
        producto.descripcion,
        producto.stock,
        producto.puntoDeReposicion,
        producto.imagen,
        producto.modelo,
        producto.marca
    ];

    var sql = 'INSERT INTO productos';
    sql += '(idCategoria, nombre, descripcion, stock, puntoDeReposicion, pathImagen, modelo, marca)';
    sql += 'VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    console.log('sql', sql);
    console.log('values', values);
    pool.query(sql, values, (error, result) => {
    if (error) throw error;

    res.send(result);
    });
});

module.exports = router;

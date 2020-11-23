var express = require('express');
var router = express.Router();
const pool = require('../config');

router.get('/', (request, response) => {
  pool.query('SELECT * FROM categorias', (error, result) => {
      if (error) throw error;

      response.send(result);
  });
});

router.get('/:id', (request, response) => {
    const id = request.params.id;
    pool.query('SELECT * FROM productos WHERE idCategoria = '+ id , (error, result) => {
        if (error) throw error;
  
        response.send(result);
    });
  });
  

router.post('/', (req, res) => {
    const categoria = req.body.categoria;
    
    const values = [
        categoria.esProbable,
        categoria.descripcion,
    ];

    var sql = 'INSERT INTO categorias';
    sql += '(esProbable, descripcion)';
    sql += 'VALUES (?, ?)';

    pool.query(sql, values, (error, result) => {
    if (error) throw error;

    res.send(result);
    });
});

module.exports = router;

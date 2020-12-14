var express = require('express');
var router = express.Router();
const pool = require('../config');

router.get('/debito/:idusuario', (req, res) => {
    const idusuario = req.params.idusuario;
    console.log('idusuario:  ', idusuario)
    pool.query('SELECT * FROM tarjetas WHERE tipo = "TD" and idUsuario = ' + idusuario, (error, result) => {
      if (error) throw error;
      console.log(result);
      res.send(result);
    });
  });
  
  router.get('/credito/:idusuario', (req, res) => {
    const idusuario = req.params.idusuario;
    console.log('idusuario:  ', idusuario)
    pool.query('SELECT * FROM tarjetas WHERE tipo = "TC" and idUsuario = ' + idusuario, (error, result) => {
      if (error) throw error;
      console.log(result);
      res.send(result);
    });
  });


module.exports = router;

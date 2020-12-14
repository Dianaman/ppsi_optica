var express = require('express');
var router = express.Router();
const pool = require('../config');

router.get('/:idusuario', (req, res) => {
    const idusuario = req.params.idusuario;
    console.log('idusuario:  ', idusuario)
    pool.query('SELECT * FROM direccion WHERE idUsuario = ' + idusuario, (error, result) => {
      if (error) throw error;
      res.send(result);
    });
  });
  


module.exports = router;

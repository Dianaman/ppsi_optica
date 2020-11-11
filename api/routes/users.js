var express = require('express');
var router = express.Router();
const pool = require('../config');

/* GET users listing. */
router.get('/', (request, response) => {
  pool.query('SELECT * FROM users', (error, result) => {
      if (error) throw error;

      console.log('users', result);
      response.send(result);
  });
});

router.get('/byUsername/:username/:clave', (req, res) => {
  var sql = `SELECT * FROM users WHERE usuario='${req.params.username}' AND clave = '${req.params.clave}' LIMIT 1`;
  pool.query(sql, (error, result) => {
      if (error) throw error;

      console.log('User: ', result);
      res.send(result[0]);
  });
});

router.post('/add', (req, res) => {

  var sql = "";

  // Consultamos si el usuario ya existe.
  sql = `SELECT * FROM users WHERE usuario='${req.body.userName}'`;
  pool.query(sql, (error, result) => {
    if (error) throw error;

    // Si el usuario no existe AGREGAMOS NUEVO USUARIO
    if(result[0] == null){
      sql = `INSERT INTO users (nombre, apellido, tipo, email, clave, usuario) VALUES ('${req.body.firstName}', '${req.body.lastName}', 'cliente', '${req.body.email}', '${req.body.password}', '${req.body.userName}')`;
      pool.query(sql, (error, result) => {
        if (error) throw error;
    
        console.log("Nuevo usuario agregado correctamente");
        res.send(result);
      });
    }else{
      console.log("Nombre de usuario ya existente");
      res.send(false);
    }
  });
});

module.exports = router;

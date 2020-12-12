var express = require('express');
var router = express.Router();
const pool = require('../config');

/* GET users listing. */
router.get('/', (request, response) => {
  pool.query('SELECT * FROM users WHERE tipo != "admin" AND tipo != "superadmin"', (error, result) => {
      if (error) throw error;

      response.send(result);
  });
});

router.get('/all', (request, response) => {
  pool.query('SELECT * FROM users WHERE tipo != "superadmin"', (error, result) => {
      if (error) throw error;

      response.send(result);
  });
});


router.get('/:id', (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM users WHERE id = '+ id , (error, result) => {
      if (error) throw error;

      res.send(result);
  });
});

router.get('/byUsername/:username/:clave', (req, res) => {
  var sql = `SELECT * FROM users WHERE usuario='${req.params.username}' AND clave = '${req.params.clave}' LIMIT 1`;
  pool.query(sql, (error, result) => {
      if (error) throw error;

      if(result[0] == null){
        console.log("Usuario y/o contraseña invalidos!");
        res.send(false);
      }else{
        console.log('User: ', result);
        res.send(result[0]);
      }
  });
});

router.post('/add', (req, res) => {

  var sql = "";

  const { user } = req.body;

  // Consultamos si el usuario ya existe.
  sql = `SELECT * FROM users WHERE usuario='${user.userName}'`;
  pool.query(sql, (error, result) => {
    if (error) throw error;

    // Si el usuario no existe AGREGAMOS NUEVO USUARIO
    if(result[0] == null){
      sql = 'INSERT INTO users (nombre, apellido, tipo, email, clave, usuario, fechaRegistro, estado)';
      sql += `VALUES ("${user.firstName}", "${user.lastName}", "${user.tipo}", "${user.email}", "${user.password}", "${user.userName}", CURRENT_TIMESTAMP, "activo")`;
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

router.post('/validate', (req, res) => {
  const {user, email} = req.body;
  const values = [user, email];

  var sql = "SELECT * FROM users WHERE usuario = ? OR email = ?";

  pool.query(sql, values, (error, result) => {
    if (error) throw error;

    result && result.length ? res.send(false) : res.send(true);
  });

});

router.put('/state', (req, res) => {
  const {user, estado} = req.body;
  const values = [estado, user.id];

  var sql = "UPDATE users SET estado = ? WHERE id = ?";

  pool.query(sql, values, (error, result) => {
    if (error) throw error;

    res.send(result);
  });
});

module.exports = router;

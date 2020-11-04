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

router.post('/add', (req, res) => {
  console.log(req.body);
  var sql = `INSERT INTO users (nombre, apellido, tipo, email, clave, usuario) VALUES ('${req.body.firstName}', '${req.body.lastName}', 'cliente', '${req.body.email}', '${req.body.password}', '${req.body.userName}')`;
  console.log(sql);
  pool.query(sql, (error, result) => {
    if (error) throw error;

    console.log("1 user inserted");
    res.send(result);
  });
});

module.exports = router;

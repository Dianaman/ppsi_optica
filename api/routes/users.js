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

module.exports = router;

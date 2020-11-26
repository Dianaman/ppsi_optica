var express = require('express');
var router = express.Router();
const pool = require('../config');

/* GET users listing. */

router.get('/', (request, response) => {
  pool.query('SELECT * FROM pedidos', (error, result) => {
    if (error) throw error;

    console.log('compras', result);
    response.send(result);
  });
});


router.post('/add', (req, res) => {

  var sql = `INSERT INTO pedidos (Idusuario, estado, tipoEnvio) VALUES ('${req.body.idusuario}','activo', 'envío a domicilio')`;

  pool.query(sql, (error, result) => {
    if (error) throw error;

    const idPedido = result.insertId;
    let ind = 0;
    var val = (`('${idPedido}', '1', `)
    var sqldet = (`INSERT INTO detallePedidos ( idPedido, Iddetallefactura, idproducto)  VALUES `);


    req.body.idproductos && req.body.idproductos.map((item) => {
      console.log(req.body.idproductos[ind]);
      if (ind === 0) sqldet = sqldet + val + `'${req.body.idproductos[ind]}')`;
      else sqldet = sqldet + ',' + val + `'${req.body.idproductos[ind]}')`;
      ind++;
      console.log(sqldet);
    })

    pool.query(sqldet, (err, ress) => {
      if (err) throw err;

      res.send(result);
    });





  });






});

module.exports = router;

var express = require('express');
var router = express.Router();
const pool = require('../config');

/* GET users listing. */

router.get('/', (request, response) => {
  pool.query('SELECT * FROM pedidos', (error, result) => {
    if (error) throw error;

  
    response.send(result);
  });
});


router.post('/add', (req, res) => {
  console.log('req.body.Tarjeta', req.body.Tarjeta);
  let idDireccion = req.body.idDireccion;
  var sqlDir =""
  if (idDireccion === 999999999){
   sqlDir = `INSERT INTO direccion (idUsuario, provincia, codPostal, ciudad, calleAltura, pisoDepto) VALUES ('${req.body.idusuario}','${req.body.dir.provincia}', '${req.body.dir.CP}', '${req.body.dir.localidad}', '${req.body.dir.calle}', '${req.body.dir.altura}')`;
  }
  pool.query(sqlDir, (error, result) => {
    if (idDireccion !== 999999999){idDireccion = req.body.idDireccion}
     else idDireccion = result.insertId;
  
     let idTarjeta = req.body.idTarj;
     var sqlTarj =""
     if (idTarjeta === 999999999){
      sqlTarj = `INSERT INTO tarjetas (idUsuario, numero, titular, fechaVto,tipo) VALUES ('${req.body.idusuario}','${req.body.Tarjeta.nroTarjeta}', '${req.body.Tarjeta.titular}', '${req.body.Tarjeta.fechaVto}', '${req.body.Tarjeta.tipo}')`;
     }
     console.log('query Tarjeta', sqlTarj);
     pool.query(sqlTarj, (error, result) => {
       if (idTarjeta !== 999999999){idTarjeta = req.body.idTarj}
        else idTarjeta = result.insertId;
        
        
        
  var sql = `INSERT INTO pedidos (Idusuario, estado, tipoEnvio, idDirEnvio, monto) VALUES ('${req.body.idusuario}','pendiente', '${req.body.tipoEnvio}','${idDireccion}',  '${req.body.monto}')`;

  pool.query(sql, (error, result) => {
    if (error) throw error;
    console.log(req.body);
    const idPedido = result.insertId;
    let ind = 0;



      var sqlFac = `INSERT INTO facturas (monto, tipoPago, idTarjeta, estado, idPedido) VALUES ('${req.body.monto}','${req.body.TipoPago}', '${idTarjeta}','pendiente de pago', '${idPedido}')`;
      pool.query(sqlFac, (error, result) => {
        if (error) throw error;
        console.log(sqlFac);


        var val = (`('${idPedido}', '1', `)
        var sqldet = (`INSERT INTO detallePedidos ( idPedido, Iddetallefactura, idproducto, cantidad, precioUnitario)  VALUES `);
        req.body.idproductos && req.body.idproductos.map((item) => {
          console.log(req.body.idproductos[ind]);
          console.log(req.body.cantprod[ind]);
          if (ind === 0) sqldet = sqldet + val + `'${req.body.idproductos[ind]}'` + ',' + `'${req.body.cantprod[ind]}'` + ',' + `'${req.body.precioUnitario[ind]}')`;
          else sqldet = sqldet + ',' + val + `'${req.body.idproductos[ind]}'` + ',' + `'${req.body.cantprod[ind]}'` + ',' + `'${req.body.precioUnitario[ind]}')`;
          console.log(req.body.cantprod[ind]);
          
          var modStock = `UPDATE productos set stock = stock - ${req.body.cantprod[ind]} where idProducto = '${req.body.idproductos[ind]}'`; 
           ind++;
           pool.query(modStock, (error, result) => {
            if (error) throw error;
            console.log(modStock);
         
          console.log(sqldet);
          

        });
        })

        pool.query(sqldet, (err, ress) => {
          if (err) throw err;

          console.log(sqldet);
          
         

          res.send(result);
        });
      });
    });
  });

});
});


router.get('/envio', (req, res) => {
  //console.log('cp envios  ', req);
  var sqlConsulta = 'SELECT * FROM envios ';
  console.log(sqlConsulta);
  pool.query(sqlConsulta , (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

router.get('/:CP', (req, res) => {
  const CP = req.params.CP;
  console.log('cp api  ', CP)
  pool.query('SELECT Precio FROM envios WHERE codigoPostal = ' + CP, (error, result) => {
    if (error) throw error;
    console.log(result[0]);
    res.send(result[0]);
  });
});





module.exports = router;

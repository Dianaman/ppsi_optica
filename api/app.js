var debug = require('debug')('api:server');
var https = require('https');
var http = require('http');
var fs = require('fs');

//var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require("cors");
var bodyParser = require('body-parser');
const formData = require('express-form-data')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');
var filesRouter = require('./routes/files');
var compraRouter = require('./routes/compras');
var direccionesRouter = require('./routes/direcciones');
var tarjetasRouter = require('./routes/tarjetas');
var salesRouter = require('./routes/sales');
var myOrdersRouter = require('./routes/my-orders');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/compra', compraRouter);
app.use('/sales', salesRouter);
app.use('/my-orders', myOrdersRouter);
app.use('/direcciones', direccionesRouter);
app.use('/tarjetas', tarjetasRouter);


app.use(formData.parse());

app.use('/files', filesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '9000');
process.env['PORT'] = process.env.PORT || '9001';

app.set('port', port);

/**
 * Create HTTP server.
 */
const options = {
  key: fs.readFileSync("keys/key.pem"),
  cert: fs.readFileSync("keys/cert.pem")
};


/**
 * Listen on provided port, on all network interfaces.
 */

//if (process.env.NODE_ENV != 'production') {
var server = http.createServer(app);
server.listen(port);
/*} else {
  var serverProd = https.createServer(options, app);
  serverProd.listen(port);
  serverProd.on('error', onError);
  serverProd.on('listening', onListening);
}*/



/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP serverProd "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTPS serverProd "listening" event.
 */

function onListening() {
  var addr = serverProd.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

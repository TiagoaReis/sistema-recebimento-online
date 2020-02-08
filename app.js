var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var formidable = require('formidable');
var path = require('path');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var baixa_ContaRouter = require('./routes/baixa_contaRouter');
var empresaRouter = require('./routes/empresaRouter');
var produtoRouter = require('./routes/produtoRouter');
var caixa_contaRouter = require('./routes/caixa_contaRouter');
var capa_loteRouter = require('./routes/capa_loteRouter');
var adminRouter = require('./routes/admin');

// var RecebimentoController = require('../sistema-recebimento-de-contas-online/controllers/recebimento/RecebimentoController');

var app = express();

// app.use(function(req, res, next){
//   if (req.method === 'POST') {
//     var form = formidable.IncomingForm({
//       uploadDir:path.join(__dirname, "/public/images"),
//       keepExtensions:true
//     });
//     form.parse(req, function(err, fields, files) {
//       req.fields = fields;
//       req.files = files;
//       next();
//     });
  
//   } else {
//     next();
//   }
  
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  store: new RedisStore({
    host: 'localhost', 
    port:6379
  }), secret: '030709', resave: true, saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/baixa_conta', baixa_ContaRouter);
app.use('/empresa', empresaRouter);
app.use('/produto', produtoRouter);
app.use('/caixa', caixa_contaRouter);
app.use('/capa_lote', capa_loteRouter);



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

module.exports = app;

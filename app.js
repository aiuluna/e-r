var express = require('express');
var path = require('path');
var fs = require('fs')
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var index = require('./routes/index');
var users = require('./routes/users');

//接口
var ports = require('./controller/port.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json()); //前端application/json格式传输过来需要转换
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('userdo'));


app.use(session({   //多进程走redis
  store: new RedisStore({
    host: config.HOSTredis_url,
    port: config.HOSTredis_port,
    db: 1,
    pass: config.HOSTredis_pwd,
    ttl: 125, //过期时间,秒
    logErrors: true
  }),
  resave: false,
  saveUninitialized: true,
  secret: 'userdo',
}))

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);
// app.use('/', express.static(path.join(__dirname, 'client')));
app.use('/', express.static(path.join(__dirname, './client/build')));


app.post('/api/reserve', ports.postUser);//预约演示

// app.use(express.static(path.join(__dirname, 'client')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3000, function () {
  console.log('e-r系统启动成功');
});
module.exports = app;




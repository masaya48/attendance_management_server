import * as express from 'express';
import * as path from 'path';
// import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as helmet from 'helmet';

let app = express();

// helmet(セキュリティー関連)
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

require('./routes/index')(app, config);

// catch 404 and forward to error handler
app.use((req:express.Request, res:express.Response, next:express.NextFunction) => {
  let err = new Error('Not Found');
  Object.defineProperty(err, 'status', 404);
  next(err);
});

// error handler
app.use((err:Error, req:express.Request, res:express.Response, next:express.NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err['status'] || 500);
  res.render('error');
});

module.exports = app;

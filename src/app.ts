import * as express from 'express'
import * as path from 'path'
// import * as favicon from 'serve-favicon'
import * as logger from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'
import * as cors from 'cors'
import routes from './controller/routes/api/v1'
import ErrorResponseAdapter from './controller/adapters/response/error_response_adapter'
import ApplicationError from './libs/errors/application_error';
import { ErrorCode } from './utils/constants/error_code';

const errorResponseAdapter = new ErrorResponseAdapter()
const app = express()

// helmet(セキュリティー関連)
app.use(helmet())

// cors
// app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, './../views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, './../public')))

// 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Authorization,Content-Type,Accept,content-type')
  next()
})

// url mappings
app.use('/api', routes())

app.options('*', function (req, res) {
  res.sendStatus(200)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new ApplicationError(ErrorCode.NotFound)

  // let err = new Error('Not Found')
  // err['status'] = 404
  return next(err)
})

// error handler
app.use((err: ApplicationError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // 修正したい…
  const errorResponse = errorResponseAdapter.convert(err)

  // render the error page
  res.status(errorResponse.getStatus() || 500)
  res.send(errorResponse.getMessage() || 'Internal Server Error')
})

// app.listen(config.server.port || 3000)

module.exports = app

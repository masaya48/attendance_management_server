// node_modules
import * as express from 'express'

export default function test() {
  let router = express.Router()

  /* GET home page.*/
  router.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    return res.render('index', {title: 'Express'})
  })

  return router
}

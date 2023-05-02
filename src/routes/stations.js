import express from 'express'
import { auth } from '../middlewares/auth.js'

const stationsRouter = express.Router()
stationsRouter.use(auth)

/* GET stations listing. */
stationsRouter.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

export { stationsRouter }

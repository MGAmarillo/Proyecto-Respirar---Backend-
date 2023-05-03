import express from 'express'
import { retrieveAllStations, retrieveAllStationsFromUser } from '../controllers/stationController.js'
// import { auth } from '../middlewares/auth.js'

const stationsRouter = express.Router()
// stationsRouter.use(auth)

/* GET stations listing. */
stationsRouter.get('/', async (req, res, next) => {
  res.send(await retrieveAllStations())
})

stationsRouter.get('/user/:userId', async (req, res, next) => {
  res.send(await retrieveAllStationsFromUser(req.params.userId))
})

export { stationsRouter }

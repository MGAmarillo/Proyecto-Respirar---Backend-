import express from 'express'
import { retrieveAllStations, retrieveStationHistory } from '../controllers/stationController.js'
import { getUser } from '../middlewares/auth.js'

const stationsRouter = express.Router()

/* GET stations listing. */
stationsRouter.get('/', async (req, res, next) => {
  const user = getUser(req)

  res.send(await retrieveAllStations(user, req.query.onlyUserStations))
})

stationsRouter.get('/history', async (req, res, next) => {
  res.send(await retrieveStationHistory(req.query.stationId, req.query.time, req.query.parameter))
})

export { stationsRouter }

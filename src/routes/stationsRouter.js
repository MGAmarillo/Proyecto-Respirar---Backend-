import express from 'express'
import { retrieveAllStations, retrieveStation, retrieveStationHistory } from '../controllers/stationController.js'
import { getUser } from '../middlewares/auth.js'

const NOT_FOUND_ERROR = {
  error: 'Station not found'
}

const stationsRouter = express.Router()

/* GET stations listing. */
stationsRouter.get('/', async (req, res, next) => {
  const user = getUser(req)
  res.send(await retrieveAllStations(user, req.query.onlyUserStations))
})

stationsRouter.get('/:stationId', async (req, res, next) => {
  const station = await retrieveStation(req.params.stationId)
  if (station) {
    res.send(station)
  } else {
    res.status(404).send(NOT_FOUND_ERROR)
  }
})

stationsRouter.get('/:stationId/history', async (req, res, next) => {
  const stationHistory = await retrieveStationHistory(req.params.stationId, req.query.fromDate, req.query.toDate, req.query.parameter)
  if (stationHistory) {
    res.send(stationHistory)
  } else {
    res.status(404).send(NOT_FOUND_ERROR)
  }
})

export { stationsRouter }

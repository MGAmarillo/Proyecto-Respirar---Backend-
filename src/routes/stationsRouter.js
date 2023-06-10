import express from 'express'
import { retrieveAllStations, retrieveStationHistory, retrieveAvailableParams } from '../controllers/stationController.js'
import { getUser } from '../middlewares/auth.js'

const stationsRouter = express.Router()

/* GET stations listing. */
stationsRouter.get('/', async (req, res, next) => {
  const user = getUser(req)

  res.send(await retrieveAllStations(user, req.query.onlyUserStations))
})

stationsRouter.get('/history', async (req, res, next) => {
  res.send(await retrieveStationHistory(req.query.stationId, req.query.fromDate, req.query.toDate, req.query.parameter))
})

stationsRouter.get('/:stationId/history', async (req, res, next) => {
  res.send(await retrieveStationHistory(req.params.stationId, req.query.fromDate, req.query.toDate, req.query.parameter))
})

stationsRouter.get('/:stationId/availableparams', async (req, res, next) => {
  res.send(await retrieveAvailableParams(req.params.stationId))
})

export { stationsRouter }

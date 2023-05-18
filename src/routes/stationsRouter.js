import express from 'express'
import { retrieveAllStations } from '../controllers/stationController.js'
import { getUser } from '../middlewares/auth.js'

const stationsRouter = express.Router()

/* GET stations listing. */
stationsRouter.get('/', async (req, res, next) => {
  const user = getUser(req)

  res.send(await retrieveAllStations(user, req.query.onlyUserStations))
})

export { stationsRouter }

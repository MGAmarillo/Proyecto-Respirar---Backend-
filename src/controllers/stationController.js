import { getAllStationsFromOrion } from '../domain/fakeOrionService.js'

const retrieveAllStations = async () => {
  const allStations = await getAllStationsFromOrion()
  return Promise.resolve(
    allStations.map(station => mapStation(station))
  )
}

const retrieveAllStationsFromUser = async (userId) => {
  const allStationsFromUser = await getAllStationsFromOrion(userId)
  return Promise.resolve(
    allStationsFromUser.map(station => mapStation(station))
  )
}

const mapStation = (station) => {
  return {
    name: station.address.streetAddress,
    temperature: station.temperature,
    reliability: station.reliability,
    pm1: station.pm1,
    pm10: station.pm10,
    pm25: station.pm25,
    coordinates: {
      latitude: station.location.coordinates[0],
      longitude: station.location.coordinates[1]
    }
  }
}

export { retrieveAllStationsFromUser, retrieveAllStations }

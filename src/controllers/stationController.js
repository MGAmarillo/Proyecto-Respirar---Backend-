import { getAllStationsFromOrion } from '../domain/orionService.js'

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
    name: station.address?.value?.streetAddress,
    temperature: station.temperature?.value,
    reliability: station.reliability?.value,
    pm1: station.PM1?.value,
    pm10: station.PM10?.value,
    pm25: station.PM25?.value,
    coordinates: {
      latitude: station.location?.value?.coordinates[0],
      longitude: station.location?.value?.coordinates[1]
    }
  }
}

export { retrieveAllStationsFromUser, retrieveAllStations }

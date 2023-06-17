import { getAllStationsFromOrion, getStationFromOrion } from '../domain/orionService.js'
// import { getHistory } from '../domain/fakeStationHistory.js'
import { getHistoricDataFromStation, getAvailableParamsForStation } from '../data/cygnusDao.js'

const retrieveAllStations = async (user, onlyUserStations) => {
  if (user && onlyUserStations) {
    const allStationsFromUser = await getAllStationsFromOrion(user.id)
    if (allStationsFromUser) {
      return Promise.resolve(
        allStationsFromUser.map(station => mapStation(station))
      )
    }
  }

  const allStations = await getAllStationsFromOrion()
  if (allStations) {
    return Promise.resolve(
      allStations.map(station => mapStation(station))
    )
  }

  return Promise.resolve([])
}

const retrieveStation = async (stationId) => {
  if (stationId) {
    const station = await getStationFromOrion(stationId)
    if (station?.data && station?.data?.error === undefined) {
      const mappedStation = mapStation(station.data)
      const availableParams = await getAvailableParamsForStation(stationId)
      const completeStation = { availableParams, ...mappedStation }
      return Promise.resolve(completeStation)
    }
  }
  return Promise.resolve(undefined)
}

const retrieveStationHistory = async (stationId, fromDate, toDate, parameter) => {
  // mock para llenar el front con data
  // return Promise.resolve(getHistory(stationId, time, parameter))
  const result = await getHistoricDataFromStation(stationId, fromDate, toDate, parameter)
  const finalResult = {
    label: parameter,
    values: mapHistoricResult(result)
  }
  return Promise.resolve(finalResult)
}

const retrieveAvailableParams = async (stationId) => {
  return Promise.resolve()
}

const mapStation = (station) => {
  return {
    name: station.address?.value?.streetAddress,
    id: station.id,
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

const mapHistoricResult = (result) => {
  if (result) {
    return result.map(entry => {
      return {
        date: entry.recvTime,
        value: entry.attrValue
      }
    })
  }
}

export { retrieveAllStations, retrieveStation, retrieveStationHistory, retrieveAvailableParams }

import { getAllStationsFromOrion } from '../domain/orionService.js'
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

// stationId: identificador único de la estación, time: DAY/MONTH/YEAR, parameter: TEMPERATURE/PM#/LOQUESEA
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
  return Promise.resolve(getAvailableParamsForStation(stationId))
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

export { retrieveAllStations, retrieveStationHistory, retrieveAvailableParams }

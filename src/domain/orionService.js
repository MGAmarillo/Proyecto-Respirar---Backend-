import axios from 'axios'
import 'dotenv/config'

const orionBaseURL = process.env.ORION_BASE_URL

const getAllStationsFromOrion = async (userId) => {
  try {
    const stations = await axios.get(orionBaseURL)
    if (userId) {
      const parsedId = parseInt(userId)
      // si existiera la manera de pedir a orion las estaciones de un user sería ideal solo pedir esas y no filtrar
      const filteredStations = stations.data.filter(
        (station) => station?.userId?.value === parsedId
      )
      return Promise.resolve(filteredStations)
    }
    return Promise.resolve(stations.data)
  } catch (e) {
    console.log(e)
  }
}

const getStationFromOrion = async (stationId) => {
  try {
    const stationResponse = await axios.get(`${orionBaseURL}/${stationId}`)
    if (stationResponse.status === 200) {
      return Promise.resolve(stationResponse)
    }
  } catch (e) {
    console.log(e)
  }
  return Promise.resolve({})
}

export { getAllStationsFromOrion, getStationFromOrion }

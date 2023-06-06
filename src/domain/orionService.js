import axios from 'axios'

// harcodeado por ahora
const orionBaseURL = 'http://localhost:1026/v2/entities'

const getAllStationsFromOrion = async (userId) => {
  let stations
  try {
    stations = await axios.get(orionBaseURL)
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

export { getAllStationsFromOrion }

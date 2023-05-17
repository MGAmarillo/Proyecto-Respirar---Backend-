import axios from 'axios'

// harcodeado por ahora
const orionBaseURL = 'http://localhost:1026/v2/entities'

const getAllStationsFromOrion = async (userId) => {
  let stations
  try {
    stations = await axios.get(orionBaseURL)
  } catch (e) {
    console.log(e)
  }
  if (userId) {
    const parsedId = parseInt(userId)
    // si existiera la manera de pedir a orion las estaciones de un user sería ideal solo pedir esas y no filtrar
    const filteredStations = stations.data.filter(
      (station) => station.userId === parsedId
    )
    return Promise.resolve(filteredStations)
  }
  return Promise.resolve(stations.data)
}

const createStation = async (station) => {
  try{
    await axios.post(orionBaseURL,station)
    subscribeContext(station)
  } catch (e) {
    console.log(e)
  }
}

/*hay que cambiar el formato del JSON de payload*/
const subscribeContext = async (station) => {
 
  const payload = {
    entities: [
      {
        type: station.type,
        isPattern: stations.isPattern,
        id: station.id
      }
    ],
    attributes: [
      station.temperature,
      station.windDirection,
      station.windSpeed
    ],
    reference: 'http://localhost:5055/notify',
    duration: 'P1M',
    notifyConditions: [
      {
        type: 'ONCHANGE',
        condValues: ['temperature']
      }
    ],
    throttling: 'PT1S'
  };

  try {
    const response = await axios.post('http://localhost:1026/v1/subscribeContext', payload);
    console.log('Suscripción exitosa:', response.data);
  } catch (error) {
    console.error('Error al suscribirse:', error.response.data);
  }
};

export { getAllStationsFromOrion, createStation}

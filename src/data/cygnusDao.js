import { getConnection } from './dbConnection.js'
import 'dotenv/config'

const database = process.env.CYGNUS_DATABASE
// const database = 'sth_default'

const getHistoricDataFromStation = async (stationId, fromDate, toDate, parameter) => {
  const collection = 'sth_/_' + stationId + '_AirQualityObserved'
  const conn = await getConnection()
  const parsedFromDate = new Date(fromDate)
  parsedFromDate.setUTCHours(0, 0, 0, 0)
  const parsedToDate = new Date(toDate)
  // esto es por si se elige el día de hoy, poder mostrar los cambios del día
  parsedToDate.setUTCHours(23, 59, 59, 999)
  return await conn.db(database)
    .collection(collection)
    .find({ attrName: parameter, recvTime: { $gte: parsedFromDate, $lt: parsedToDate } })
    .toArray()
}

const getAvailableParamsForStation = async (stationId) => {
  const conn = await getConnection()
  const collection = 'sth_/_' + stationId + '_AirQualityObserved'
  return await conn.db(database)
    .collection(collection)
    .distinct('attrName', { attrType: 'Number' })
}

export { getHistoricDataFromStation, getAvailableParamsForStation }

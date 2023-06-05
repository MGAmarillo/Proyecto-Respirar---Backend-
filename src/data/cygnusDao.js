import { getConnection } from './dbConnection.js'
import 'dotenv/config'

const database = process.env.CYGNUS_DATABASE
// const database = 'sth_default'

const getHistoricDataFromStation = async (stationId, parameter) => {
  const collection = 'sth_/_' + stationId + '_AirQualityObserved'
  const conn = await getConnection()
  return await conn.db(database)
    .collection(collection)
    // TODO filter by time
    .find({ attrName: parameter })
    .toArray()
}

export { getHistoricDataFromStation }

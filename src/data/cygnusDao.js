import { getConnection } from './dbConnection.js'
import 'dotenv/config'

const database = process.env.CYGNUS_DATABASE

const parseDateFromTZToUTC = (dateToParse, tz, eod) => {
  console.log(dateToParse)
  const dateParts = dateToParse.split('-')
  const year = (dateParts[0])
  const month = (dateParts[1])
  const day = (dateParts[2])
  const time = eod ? '23:59:59' : '00:00:00'
  // example "2023-06-21T22:10:00-03:00"
  const stringDate = `${year}-${month}-${day}T${time}${tz}`

  return new Date(stringDate)
}

const getHistoricDataFromStation = async (stationId, fromDate, toDate, parameter) => {
  const collection = 'sth_/_' + stationId + '_AirQualityObserved'
  const conn = await getConnection()
  // TODO deshardcodear timezone cuando se aplique a otro país que no sea ARG
  const parsedFromDate = parseDateFromTZToUTC(fromDate, '-03:00', false)
  const parsedToDate = parseDateFromTZToUTC(toDate, '-03:00', true)
  // esto es por si se elige el día de hoy, poder mostrar los cambios del día
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

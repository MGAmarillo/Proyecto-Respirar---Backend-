import mongodb from 'mongodb'
import 'dotenv/config'

const uri = process.env.MONGODB_URI

const client = new mongodb.MongoClient(uri)

let instance = null

const getConnection = async () => {
  if (instance == null) {
    instance = await client.connect()
  }
  return instance
}

export { getConnection }

import mongodb from 'mongodb'
import 'dotenv/config'

const uri = process.env.MONGODB_URI
// const uri = 'mongodb://127.0.0.1:27017/admin?retryWrites=true&connectTimeoutMS=10000'
const client = new mongodb.MongoClient(uri)

let instance = null

const getConnection = async () => {
  if (instance == null) {
    instance = await client.connect()
  }
  return instance
}

export { getConnection }

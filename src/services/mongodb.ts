import { MongoClient } from 'mongodb'

//const uri = process.env.ATLAS_URI
const uri = process.env.MONGODB_URI

const client = new MongoClient(uri);

const clientPromise = client.connect();

export default clientPromise
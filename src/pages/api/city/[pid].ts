import clientPromise from '../../../services/mongodb'


export default async function get(req, res)  {
  try {
    const client = await clientPromise;
    const db = client.db("searchData");
    const {pid} = req.query;
    const capitalizedName = pid.length > 0 ? pid.charAt(0).toUpperCase() + pid.slice(1) : pid;
    const cities = await db.collection("City").find({'name': {'$regex': pid.charAt(0).toUpperCase() + pid.slice(1)}} ).limit(5).toArray();
    

    res.json(cities);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};
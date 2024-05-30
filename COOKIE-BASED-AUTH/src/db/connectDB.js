const mongoose = require('mongoose');

const connectDB = async() =>{
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    c.l (`Mongo Connected: ${conn.connection.host}`)
  }
  catch (err){
    c.l (`Error connecting to mongoDB:`, err)
  }
}

module.exports = [
  connectDB,
]
const http = require('http')
// const http = require('node:http')
const PORT = process.env.PORT || 800;
require("dotenv").config()
const app = require("./src/app")

try {const conn = await mongoose.connect(process.env.MONGO_URI);
c.l (`Mongo Connected: ${conn.connection.host}`)
}
catch (err){
c.l (`Error connecting to mongoDB:`, err)
}

server.listen("127.0.0.1", 8000, ()=>{

})

startServer()
const express = require("express");
const { httpRegisterUser } = require("./controllers/user.controller");
const { httpProtected } = require("./controllers/auth.controllers");
const app = express();
const { httpLogin } = require("./controllers/auth.controllers")
app.use(cors());

app.use(express.json())
app.use(cookieParser())
// app.post("/login", (req, res)=>{
//   // 1. Check if username & password exists

//   //2. If exists, continue to next step else return error
//   //3. Gen sessionToken & expiry date
//   //4. Store session (into a db or state)
//   // 5. Send cookie to client
//   // 6.
//   res.status(200).json({message: "Welcome"});
// });
app.post("/login", httpLogin);
app.post("/register", httpRegisterUser)
app.post("/protected", httpProtected)

app.use("/*", (req, res) =>{
  res.status(404).json({message: "Route not found"})
})

module.exports  = app
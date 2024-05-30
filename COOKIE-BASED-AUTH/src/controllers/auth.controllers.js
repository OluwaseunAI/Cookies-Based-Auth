const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const user = require("../models/user.model");
const uuid = require("uuid");

const sessions = {}; //causes loss of state
//instead of saving to session local storage var, we could save to a DATABASE like mongo or red disc

async function httpLogin(req, res) {
  try {
    const { email, password } = req.body

    //find user by email
    const user = await user.findOne({email: email});
    //const user = await USer.findOne({email}); JSX6

    if (!user){
      return res.status(401).json({ message: "Invalid username or password"})
    }

    console.log(user)

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(401).json({ message: "Invalid username or password"})
    }
// const sessions =
const sessionToken = uuid.v4();
const expiresAt = new Date().setFullYear(new Date().getFullYear()+1);
// const expiresAt = 24 * 60 * 60 * 1000;
// const payload = { user } //beginner

sessions[sessionToken] = {
  expiresAt,
  userId: user._id,
};

console.log("sessions", sessions)

res.cookie('auth_cok', sessionToken, {maxAge: expiresAt})
res.status(200).json({message: "Welcome"})
    //Generate JWT
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res(accessToken)
  } catch (err){

  }
  console.log(user);
}

async function httpProtected (req, res){
  console.log(req.cookies);
  const sessionToken = req.cookies["auth_cok"];
  if(!sessionToken) {
    return res.status(401).json({ message: "Unathorized" });
  }
  const currentSession = sessions[sessionToken];
  if (!currentSession) {
    res.status(401).json({ message: "Unauthorized"})
  }

  console.log(currentSession?.expiresAt, new Date())

  if (currentSession?.expiresAt < new Date ()){
    res.status(401).json({ message: "Unauthorized"})
  }

  res.json(200).json({ message: "Access granted"})
}

module.exports = {
  httpLogin,
  httpProtected,
};
const Users = require("../models/user.model")

async function httpRegisterUser (req, res){
  try {
    const {username, email, password} = req.body;

      if (!username || !email || !password){
        return res.status(400).json({message:"Please enter all fields"})
      }

      //UNIQUENESS OF EMAIL// ONLY ONE USER TO ...
      //check for existing user

      const existingUser = await User.findOne({email});

      if (existingUser){
        return res.status(400).json({message: "Email already exists"})
      }
        const user = new User({username, email, password});

      await user.save()



      //respond with succ
      res.status(201).json({
        message: "U created succ",
        user: {
          email: savedUser.email,
          password: savedUser.password,
        },
      })
  }
  catch (error) {
    console.error("error", error)
    res.status(500).json({message:"Failed to create user, server error"})
  }
}

async function httpGetUsers(req, res) {
  const users = await User.find({});

  res.json({message: "Access granted", user: users});
}

module.exports = {
  httpRegisterUser,
  httpGetUsers,
}
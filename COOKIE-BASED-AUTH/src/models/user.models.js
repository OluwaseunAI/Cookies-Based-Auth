const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
})

//preSave hook //arr functions do not have this keyword
userSchema.pre('save', async function (next) {
  if (!this.isModified("password")){
    next();
  }
  //on login, accesstoken returned

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
})


module.exports = mongoose.model("user", userSchema)
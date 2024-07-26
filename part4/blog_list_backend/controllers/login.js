const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { response } = require('express')
require('dotenv').config()
require('express-async-errors')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  if(!(username && password)) {
    return res.status(401).json({error: 'missing username or password'})
  }
  
  const user = await User.findOne({ username })
  if(!user) {
    return res.status(401).json({error: 'invalid username'})

  }
  const passwordOk = await bcrypt.compare(password, user.passwordHash)
  if (!passwordOk) {
    return res.status(401).json({error: 'invalid password'})
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
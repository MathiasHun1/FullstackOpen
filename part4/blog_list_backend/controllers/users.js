const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
require('express-async-errors')

usersRouter.get('/', async (req, res) => {
  const result = await User.find({}).populate('blogs')
  res.json(result)
})

usersRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const result = await User.findById(id).populate('blogs')

  if (!result) {
    res.status(404).json({error: 'user not exist'})
  }
  res.json(result)
})

usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body

  if (!(username && password)) {
    res.status(400).json({error: 'missing username or password!'})
  }
  if(password.length < 3) {
    res.status(400).json({error: 'password must be at least 3 characters long!'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if(!(name && username)) {
    res.status(400).json({error: 'Missing name or username'})
  }

  const newUser = new User({ name, username, passwordHash })
  await newUser.save()

  res.status(201).json(newUser)
})

usersRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  const userToDelete = await User.findByIdAndDelete(id)
  if(!userToDelete) {
    res.status(400).json({error: 'user not exists'})
  }
  res.status(204).json(userToDelete)
})

module.exports = usersRouter
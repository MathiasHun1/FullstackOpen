const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if(!request.token) {
    request.user = null
    return next()
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id) {
      request.user = null
    } else {
      request.user = await User.findById(decodedToken.id)
    }
  } catch(error) {
    request.user = null
  }

  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).send({error: `Mailformed id!`})
  } else if (error.name === 'ValidationError') {
    response.status(400).json({error: error.name})
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({error: 'token invalid'})
  } else {
    response.status(500).json({error: error.name})
  }
  next(error)
} 

module.exports = {
  errorHandler, 
  requestLogger,
  tokenExtractor,
  userExtractor
}
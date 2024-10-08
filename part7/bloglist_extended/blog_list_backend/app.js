const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const { requestLogger, errorHandler, tokenExtractor, userExtractor } = require('./utils/middleware')

const main = async () => {
  logger.info('connecting to MongoDB...')
  
  await mongoose.connect(config.URI)
  logger.info('Connected to MongoDB')

  app.use(express.json())
  app.use(cors())

  if (process.env.NODE_ENV === 'development') {
    app.use(requestLogger)
    const testRouter = require('./controllers/test')
    app.use('/api/test', testRouter)
  }
  
  app.use(tokenExtractor)
  app.use(userExtractor)
  app.use('/api/login', loginRouter)
  app.use('/api/blogs', blogsRouter)
  app.use('/api/users', usersRouter)
  app.use(errorHandler)
}

main()

module.exports = app
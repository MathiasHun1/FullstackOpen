const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info('connecting to MongoDB...')

mongoose.connect(config.URI)
  .then(response => logger.info('Connected to MongoDB'))

app.use(express.json())
app.use(middleware.requestLogger)
app.use(cors())

app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)

module.exports = app
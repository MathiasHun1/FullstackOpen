const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

logger.info('Connecting to server...')

const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
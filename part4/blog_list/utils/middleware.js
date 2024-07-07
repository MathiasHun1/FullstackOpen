const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).send({error: `Mailformed id!`})
  } else if (error.name === 'ValidationError') {
    response.status(400).json({error: error.message})
  }
  next(error)
} 

module.exports = {
  errorHandler, requestLogger
}
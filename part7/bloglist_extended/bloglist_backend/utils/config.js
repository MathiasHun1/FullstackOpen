require('dotenv').config()

const URI = (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

  console.log('Environment: ', process.env.NODE_ENV)
  
const PORT = process.env.PORT

module.exports = {
  URI,
  PORT
}

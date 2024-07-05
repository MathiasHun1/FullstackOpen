const mongoose = require('mongoose')
require('dotenv').config() // load env variables

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL // init url from env

mongoose.connect(url)
  .then(result => {
    console.log('Connected to Mongodb')
  })
  .catch(error => {
    console.log('Connnection to MongoDB failed', error.message);
  })

// define mongoose Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /^\d{2,3}-\d{5,}$/.test(v)
      },
      message: props => `${props.value} is not a valid Phone Number!`
    },
    required:true
  }
})

// config schema to retunr a formatted object
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id 
    delete returnedObject.__v
  }
})

// 'make' and export Person constructor
const Person = mongoose.model('Person', personSchema)

module.exports = Person


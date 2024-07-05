require('dotenv').config()

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('password is required as argument')
  process.exit(1)
}

const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)

mongoose.connect(url)

const cardSchema = new mongoose.Schema(
  {
    name: String,
    number: String
  }
)

const Person = mongoose.model('Person', cardSchema)

if (process.argv.length === 3 && process.argv[2] === password) {
  Card.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  
  person.save().then(result => {
      console.log('person saved')
      mongoose.connection.close()
  })
}



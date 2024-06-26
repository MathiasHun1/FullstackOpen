const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('content', function getContent (req) {
  return JSON.stringify(req.body) 
})

const requestLogger = (req, res, next) => {
  console.log(req.path)
  console.log(req.body)
  next()
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return res.status(400).send({error: 'Malformatted id'})
  }

  next(error)
}

const unknownEndpointHandler = (req, res, next) => {
  res.status(404).send({error: 'Url not exists'
  })
  next()
}

app.use(cors())
app.use(requestLogger)
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))
app.use(morgan(':content'))


app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
})

app.get('/api/info', (req, res) => {
  const length = Person.find({}).length
  Person.find({})
    .then(persons => {
      const personInfo = {
        "persons in phonebook": persons.length
      }
      res.json(personInfo)
    }
    )
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    }) 
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedNote => {
      response.json(savedNote)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

app.use(unknownEndpointHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
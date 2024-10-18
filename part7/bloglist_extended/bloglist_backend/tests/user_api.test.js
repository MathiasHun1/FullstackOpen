const app = require('../app')
const supertest = require('supertest')
const { beforeEach, describe, test, after } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const { initialUsers, usersInDb, nonExistingUserId } = require('./test_helper')
const mongoose = require('mongoose')
const { log } = require('node:console')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

describe('when initially some users added', () => {
  
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    assert.strictEqual(response.body.length, initialUsers.length)
  }) 

  test('a specific user is within the returned users', async () => {
    const response = await api.get('/api/users')

    const names = response.body.map(user => user.name)
    assert((names).includes('Nagy Ilona'))
  })
})

describe('viewing a specific user', () => {
  test('succeeds with a valid id', async () => {
    const usersAtaStart = await usersInDb()

    const userToWiev = usersAtaStart[0]

    const resultNote = await api
      .get(`/api/users/${userToWiev.id}`)
      .expect(200)
      .expect('Content-type', /application\/json/)

    assert.deepStrictEqual(userToWiev, resultNote.body)
  })

  test('fails status code 404 if user not exist', async () => {
    const validNonExistingId = await nonExistingUserId()
    log(validNonExistingId)
    await api
      .get(`/api/users/${validNonExistingId}`)
      .expect(404)  
  })

  test('fails status code 400 with invalid id', async () => {
    await api 
      .get('/api/users/"23423523dfgdfg23"')
      .expect(400)
   }) 
}) 

describe('addition of a new user', () =>{
  test('succeeds with valid data', async () => {
    const usersAtaStart = await usersInDb()

    const userToAdd = {
      name: 'Domotori Vazul',
      username: 'vazze',
      password: 'admin'
    }
  
    await api.post('/api/users')
      .send(userToAdd)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtaStart.length+1, usersAtEnd.length)

    const names = usersAtEnd.map(user => user.name)
    assert(names.includes(userToAdd.name))
  })

  test('fails with status code 400 if data invalid', async () => {
    const usersAtaStart = await usersInDb()

    const userToAdd = {
      username: 'jajajaa'
    }

    await api.post('/api/users')
      .send(userToAdd)
      .expect(400)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtaStart.length, usersAtEnd.length)
  })
})

describe('deletion of a node', () => {
  test('succeeds with staus code 204 if id is valid', async () => {
    const usersAtaStart = await usersInDb()

    const userToDelete = usersAtaStart[0]
    await api.delete(`/api/users/${userToDelete.id}`)
      .expect(204)
    
    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtaStart.length - 1, usersAtEnd.length)

    const usernames = usersAtEnd.map(user => user.username)
    assert(!usernames.includes(userToDelete.username))
  })
})



after(async () => {
  await mongoose.connection.close()
})

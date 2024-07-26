const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const assert = require('assert')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

let headers;

beforeEach(async () => {
  // clear db
  await User.deleteMany({})
  await Blog.deleteMany({})

  //generate passwordhashes for every users
  for (let user of helper.initialUsers) {
    const saltRounds = 10
    let passwordHash = await bcrypt.hash(user.password, saltRounds)
    user.passwordHash = passwordHash
  }
  //save users in db
  await User.insertMany(helper.initialUsers)

  //pick a user from db
  const userForTest = await User.findOne({ username: helper.initialUsers[1].username })

  //create blogs array with user field
  for (let blog of helper.initialBlogs) {
    blog.user = userForTest._id
    let blogToSave = new Blog(blog)

    userForTest.blogs = userForTest.blogs.concat(blogToSave._id)
    await blogToSave.save()
    await userForTest.save()
  }

  const result = await api.post('/login')
      .send({ 
        username: helper.initialUsers[1].username, 
        password: helper.initialUsers[1].password 
      })

      headers = {
        'Authorization': `Bearer ${result.body.token}`
      }
})

describe('viewing blogs', () => {

  test('returns blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })
  
  test('returns all blogs', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

})

describe('blog manipulation', () => {

  test('succesfully creating a new blog', async () => {
  
    const newBlog = ({
      title: "Winettou adventures",
      author: "Karl May",
      url: "www.winettou.com",
      likes: 18
    })
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const requestAll = await api.get('/api/blogs')
    const allBlogs = requestAll.body
  
    assert.strictEqual(allBlogs.length - 1, helper.initialBlogs.length)
    assert.strictEqual(allBlogs[allBlogs.length-1].title, newBlog.title)
  })
  
  test('if likes prop not included, it defaults to 0', async () => {
    const newBlog = ({
      title: "Winettou adventures",
      author: "Karl May",
      url: "www.winettou.com",
    })
  
    const result = await api.post('/api/blogs')
      .send(newBlog)
      .set(headers)
  
    assert.strictEqual(result.body.likes, 0)
  })
  
  test('response 400 if url or title props are missing ', async () => {
    const newBlog = ({
      author: "Karl May",
      likes: 25
    })
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)
  
  })
  
  test('deletes a blog', async () => {
    const response = await api.get('/api/blogs')
    const allBlogs = response.body
    const lastBlog = allBlogs[allBlogs.length-1]
  
    await api
      .delete(`/api/blogs/${lastBlog.id}`)
      .set(headers)
      .expect(204)
  
    const newResponse = await api.get('/api/blogs')
    const newAllBlogs = newResponse.body
  
    assert.strictEqual(helper.initialBlogs.length, newAllBlogs.length +1)
  })
  
  test('update blog likes', async () => {
    const blogsList = await helper.blogsInDb()
    const lastBlogId = blogsList[blogsList.length-1].id
  
    await api
      .put(`/api/blogs/${lastBlogId}`)
      .send({likes: 33})
      .set(headers)
      .expect(200)
  
    const updatedBlog = await Blog.findById(lastBlogId)
  
    assert(33, updatedBlog.likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})
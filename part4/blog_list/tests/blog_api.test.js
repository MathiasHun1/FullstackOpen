const { test, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const assert = require('assert')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const { log } = require('console')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

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

test('returned blog id equals to default _id in database', async () => {
  const response = await api.get('/api/blogs/')
  const blogIdsArray = response.body.map(blog => blog.id)
  const blogDefaultIdsArray = response.body.map(blog => blog._id)
  assert.deepEqual(blogIdsArray, blogDefaultIdsArray)
})

test('succesfully creating a new post', async () => {
  const newBlog = ({
    title: "Winettou adventures",
    author: "Karl May",
    url: "www.winettou.com",
    likes: 18
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
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

  const result = await api.post('/api/blogs').send(newBlog)

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
    .expect(400)

})

test('deletes a blog', async () => {
  const response = await api.get('/api/blogs')
  const allBlogs = response.body
  const lastBlog = allBlogs[allBlogs.length-1]

  await api
    .delete(`/api/blogs/${lastBlog.id}`)
    .expect(204)

  const newResponse = await api.get('/api/blogs')
  const newAllBlogs = newResponse.body

  assert.strictEqual(helper.initialBlogs.length, newAllBlogs.length +1)
})

test.only('update blog likes', async () => {
  const blogsList = await helper.blogsInDb()
  const lastBlogId = blogsList[blogsList.length-1].id

  await api
    .put(`/api/blogs/${lastBlogId}`)
    .send({likes: 33})
    .expect(200)

  const updatedBlog = await Blog.findById(lastBlogId)

  assert(33, updatedBlog.likes)
  console.log(updatedBlog);
})

after(async () => {
  await mongoose.connection.close()
})
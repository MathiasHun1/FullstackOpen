const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')


blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', { name: 1, username: 1, })
  response.json(result)
})


blogsRouter.get('/:id', async (request, response) =>{
  const result = await Blog.findById(request.params.id).populate('user')
  response.status(200).json(result)
})


blogsRouter.post('/', async (request, response) => {
  let { title, author, url, likes } = request.body

  const user = request.user
  if(!user) {
    return response.status(401).json({error: 'token invalid'})
  }

  const blogToSave = new Blog({
    title,
    author,
    url,
    likes: likes === undefined ? 0 : likes,
    user: user._id
  })

  const savedBlog = await blogToSave.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  
  const user = request.user
  if(!user) {
    return response.status(401).json({error: 'token invalid'})
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({error: 'blog deletion allowed only for the owner'})
  }

  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const user = request.user
  if (!user) {
    return response.status(401).json({error: 'token invalid'})
  }

  const userBlogs = user.blogs.map(blog => blog.toString())
  if(!userBlogs.includes(request.params.id)) {
    return response.status(401).json({error: 'blog update allowed only for the owner'})
  }

  const result = await Blog.findOneAndUpdate({_id: request.params.id}, { likes: likes }, {new: true})
  response.status(200).json(result)
})

module.exports = blogsRouter 
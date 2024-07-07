const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
  response.json(result)
})

blogsRouter.get('/:id', async (request, response) =>{
  const result = await Blog.findOne({id: request.params.id})
  response.status(200).json(result)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (blog.likes === undefined) {
    blog.likes = 0
  }

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const result = await Blog.findOneAndUpdate({_id: request.params.id}, { likes: likes }, {new: true})
  response.status(200).json(result)
})

module.exports = blogsRouter 
const mongoose = require('mongoose')
require('dotenv')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  
  if(process.env.NODE_ENV !== 'test') {
    delete returnedObject._id
  }
  
    delete returnedObject.__v
}
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
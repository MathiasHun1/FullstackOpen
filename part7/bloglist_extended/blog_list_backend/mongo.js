const Blog = require('./models/blog')
const User = require('./models/user')
const mongoose = require('mongoose')
const config = require('./utils/config')
require('dotenv').config()

const initialBlogs = [
  {
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 14,
  },
  {
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 1,
  },
  {
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 5,
  },
]

const initialUsers = [
  {
    name: 'Nagy Ilona',
    username: 'ilcsi63',
    password: 'orbanazisten'
  },
  {
    name: 'Kovacs Kazmer',
    username: 'kovi',
    password: 'valami'
  }
]

  
const initBlogs = async () => {
  await Blog.insertMany(initialBlogs)
}

const main = async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI)
  console.log(process.env)

  await Blog.deleteMany({})
  await User.deleteMany({})
  // await User.deleteMany({})
  
  mongoose.connection.close()
} 

main()
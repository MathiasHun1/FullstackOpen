const usersCreator = async (request) => {
  await request.post('http://localhost:5173/api/users', {
    data: {
      name: 'Kovács Lajos',
      username: 'lali',
      password: 'admin'
    }
  })
  await request.post('http://localhost:5173/api/users', {
    data: {
      name: 'Nagy Árpi',
      username: 'arpad',
      password: 'admin'
    }
  })
}

const blogsCreator = async () => {
  
}

const loginHelper = () => {
  
}

module.exports = { usersCreator }
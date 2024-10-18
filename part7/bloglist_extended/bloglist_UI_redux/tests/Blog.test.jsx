import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog' 


//TODO 5.13 - 1: checks that the component displaying a blog renders the blog's title and author
test('renders title and author by default', () => {
  const blog = {
    title: 'blog title',
    author: 'blogAuthor',
    likes: 43,
    url: 'www.blog.hu',
    id: '231523'
  }

  const {container} = render(<Blog blog={blog}/>)
  
  //find by text
  const authorElem = screen.getByText('blogAuthor')
  //find by id
  const titleElem = container.querySelector('#title')
  //find by class
  const likesElem = container.querySelector('.likes')

  expect(authorElem).toBeDefined()
  expect(titleElem).toBeDefined()
})

//TODO 5.13 - 2: but does not render its URL or number of likes by default

test('not renders likes and url by default', () => {
  const blog = {
    title: 'blog title',
    author: 'blogAuthor',
    likes: 43,
    url: 'www.blog.hu',
    id: '231523'
  }

  const {container} = render(<Blog blog={blog}/>)
  
  const likesElem = container.querySelector('.likes')
  const urlElem = container.querySelector('#url')

  //check if not rendered by multiple methods
  expect(likesElem).not.toBeInTheDocument()
  expect(likesElem).toBeFalsy()
  expect(likesElem).toBe(null)

  expect(urlElem).toBeFalsy()
})

//TODO 5.14 - Make a test, which checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked
test('renders likes after button is clicked', async () => {
  const blog = {
    title: 'blog title',
    author: 'blogAuthor',
    likes: 43,
    url: 'www.blog.hu',
    id: '231523',
    user: {
      id: '234234',
      name: 'lajos',
      username: 'laller'
    }
  }

  const {container} = render(<Blog blog={blog}/>)
  const likes = container.querySelector('#likes')
  const button = container.querySelector('#toggleButton')


  expect(likes).not.toBeInTheDocument()
  //clicks button
  const user = userEvent.setup()
  await user.click(button)

  const likesAfterClick = screen.getByText(/likes:/i)
  expect(likesAfterClick).toBeInTheDocument()
})
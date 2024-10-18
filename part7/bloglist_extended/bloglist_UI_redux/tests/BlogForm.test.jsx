import { render, screen } from "@testing-library/react"
import { assert, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import BlogForm from "./BlogForm"

//TODO 5.16: The test should check, that the form calls the event handler it received as props with the right details when a new blog is created

test('calls event handler when submit event happens', async () => {
  const mockHandler = vi.fn()

  const { container } = render(<BlogForm createBlog={mockHandler} />)
  const user = userEvent.setup()
  const button = screen.getByText('create')

  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('calls event handler with the right details after submission', async () => {
  const mockHandler = vi.fn()
  
  const { container } = render(<BlogForm createBlog={mockHandler} />)
  const user = userEvent.setup()

  //finding elements
  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('author name')
  const urlInput = screen.getByPlaceholderText('ulr address')
  const button = screen.getByText('create')

  //user interactions
  await user.type(titleInput, 'GOT')
  await user.type(authorInput, 'Martin')
  await user.type(urlInput, 'www.got.hu')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('GOT')
  expect(mockHandler.mock.calls[0][0].author).toBe('Martin')
  expect(mockHandler.mock.calls[0][0].url).toBe('www.got.hu')
})
import { useState } from "react"
import Button from "./Button"
import { MaterialSymbol } from 'react-material-symbols'

const Blog = ({ blog, deleteBlog, addLike }) => {
  const [isOpened, setIsOpened] = useState(false)
  const { author, likes, url, title, user, id } = blog

  const toggleOpen = () => {
    setIsOpened(!isOpened)
  }

  return (
    <div data-testid='blogElement' className="mb-1 p-2 border-2 border-black">

    <p>
      <i id="author">{author}</i> 
      <strong id="title">{title}</strong>

      <button id="toggleButton"
        className="btn p-1 min-h-0 h-fit  ml-2"
        onClick={toggleOpen}
      >
        {isOpened ? 'close' : 'view'}
      </button>
    </p>

    {isOpened && (
      <>
        <div className="flex flex-row gap-4">
          <p id="likes" className="inline">likes: <strong data-testid='likes-counter'>{likes}</strong>
          </p>
          <button data-testid='like-button' className="px-2 hover:bg-gray-300" onClick={() => addLike(id)}>
            <MaterialSymbol icon="thumb_up" size={24} fill grade={-25} color='blue' />
          </button>
        </div>
        <p id="url">url: <strong id="url">{url}</strong></p>
        <p id="user">user: <strong>{user.username}</strong></p>
      </>
    )}

      <Button text='remove' onClick={() => deleteBlog(blog.id)} style='bg-red-200'/>
  </div>  
  )
}

export default Blog
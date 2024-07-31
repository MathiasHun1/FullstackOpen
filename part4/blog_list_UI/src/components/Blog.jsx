import { useState } from "react"
import Button from "./Button"
import { MaterialSymbol } from 'react-material-symbols'

const Blog = ({ blog, deleteBlog, handleLike }) => {
  const [isOpened, setIsOpened] = useState(false)
  const { author, likes, url, title, user } = blog

  const toggleOpen = () => {
    setIsOpened(!isOpened)
  }
 
  const addLike = async (id) => {
    await handleLike(id)
  }

  return (
  <div className="mb-1 p-2 border-2 border-black">

    <p>
      <i>{author}:</i> <strong>{title}</strong>
      <button 
        className="btn p-1 min-h-0 h-fit  ml-2"
        onClick={toggleOpen}
      >
        {isOpened ? 'close' : 'view'}
      </button>
    </p>

    {isOpened && (
      <>
        <div className="flex flex-row gap-4">
          <p className="inline">likes: <strong>{likes}</strong>
          </p>
          <button className="px-2 hover:bg-gray-300" onClick={() => addLike(blog.id)}>
            <MaterialSymbol icon="thumb_up" size={24} fill grade={-25} color='blue' />
          </button>
        </div>
        <p>url: <strong>{url}</strong></p>
        <p>user: <strong>{user.username}</strong></p>
      </>
    )}

      <Button text='remove' onClick={() => deleteBlog(blog.id)} style='bg-red-200'/>
  </div>  
  )
}

export default Blog
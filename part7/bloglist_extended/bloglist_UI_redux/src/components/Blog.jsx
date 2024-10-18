import { useState } from "react"
import Button from "./Button"
import { MaterialSymbol } from 'react-material-symbols'
import { deleteBlog, addLike } from "../app/blogSlice"
import { useDispatch, useSelector } from "react-redux"

const Blog = ({ blog }) => {
  const [isOpened, setIsOpened] = useState(false)
  const currentUser = useSelector(state => state.user)
  const { author, likes, url, title, id, user } = blog

  const dispatch = useDispatch()

  const toggleOpen = () => {
    setIsOpened(!isOpened)
  }

  return (
    <div data-testid='blogElement' >

    <p>
      <i id="author">{author}</i> 
      <strong id="title">{title}</strong>

      <button id="toggleButton"
        onClick={toggleOpen}
      >
        {isOpened ? 'close' : 'view'}
      </button>
    </p>

    {isOpened && (
      <>
        <div >
          <p id="likes" >likes: <strong data-testid='likes-counter'>{likes}</strong>
          </p>
          <button data-testid='like-button' onClick={() => dispatch(addLike(blog))}>
            <MaterialSymbol icon="thumb_up" size={24} fill grade={-25} color='blue' />
          </button>
        </div>
        <p id="url">url: <strong id="url">{url}</strong></p>
        <p id="user">user: <strong>{user.name}</strong></p>
      </>
    )}

      <Button text='remove' onClick={() => {
        dispatch(deleteBlog(currentUser, id))
      }} />
  </div>  
  )
}

export default Blog
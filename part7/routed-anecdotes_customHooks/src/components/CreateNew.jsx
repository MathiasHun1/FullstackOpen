import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useNamedForm } from "../hooks"

const CreateNew = (props) => {
    const content = useNamedForm('content')
    const author = useNamedForm('author')
    const info = useNamedForm('info')
  
    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')
      props.setNotification(`a new anecdote ${content.props.value} is added`)
      setTimeout(() => {
        props.setNotification('')
      }, 5000)
    }

    const resetFields = () => {
      content.reset()
      author.reset()
      info.reset()
    } 
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.props} />
          </div>
          <div>
            author
            <input {...author.props} />
          </div>
          <div>
            url for more info
            <input {...info.props} />
          </div>
          <button type="button" onClick={resetFields}>reset</button>
          <button>create</button>
        </form>
      </div>
    )
  
  }

export default CreateNew
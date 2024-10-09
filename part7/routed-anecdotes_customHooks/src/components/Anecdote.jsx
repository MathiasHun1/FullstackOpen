import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    
    const anecdote = anecdotes.find(a => a.id === Number(id))
  
    if (anecdote) {
      const { content, author, info, votes } = anecdote
      return (
        <>
          <p>content: {content}</p>
          <p>author: {author}</p>
          <p>info: <a href={info}>{info}</a></p>
          <p>votes: {votes}</p>
        </>
      )
    }
  }

  export default Anecdote
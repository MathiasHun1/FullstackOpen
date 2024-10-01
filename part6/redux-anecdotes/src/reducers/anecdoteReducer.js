import { createSlice, current } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
import axios from "axios"
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// export const initialState = anecdotesAtStart.map(asObject)


// export const voteFor = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'CREATE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }


// const anecdoteReducer = (state = initialState, action) => {

//   switch (action.type) {
//     case 'CREATE': {
//       return state.concat({...action.payload})
//     }
//     case 'VOTE': {
//       return state.map(a => (
//         a.id !== action.payload.id 
//         ? a 
//         : { ...a, votes: a.votes + 1 } 
//       ))
//     }
//     default: return state
//   }
// }

// export default anecdoteReducer

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    voteFor: (state, action) => {
      const id = action.payload
      return state.map(a => 
        a.id != id ? a : {...a, votes: a.votes +1}
      )
    },
    setAll: (state, action) => {
      return action.payload
    }
  }
})

export const vote = (id) => async(dispatch, getState) => {
  // const currentAnecdote = await anecdoteService.getById(id)
  const currentAnecdote = getState().anecdote.find(anecdote => anecdote.id === id)

  const response = await anecdoteService.incrementVote(id, {votes: currentAnecdote.votes})
  dispatch(voteFor(response.id))  
}

export const initializeAnecdotes = () => async dispatch => {
  const anecdoteList = await anecdoteService.getAll()
  dispatch(setAll(anecdoteList))
}

export const createAnecdote = (content) => async dispatch => {
  const newAnecdote = await anecdoteService.createNew(content)
  dispatch(appendAnecdote(newAnecdote))
}


export const { voteFor, setAll, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
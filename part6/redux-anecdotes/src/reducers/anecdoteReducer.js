import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initialState = anecdotesAtStart.map(asObject)


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
  initialState,
  reducers: {
    createAnecdote: (state, action) => {
      state.concat(asObject(action.payload))
    },
    voteFor: (state, action) => {
      const id = action.payload
      return state.map(a => 
        a.id != id ? a : {...a, votes: a.votes +1}
      )
    }
  }
})

export const { createAnecdote, voteFor } = anecdoteSlice.actions
export default anecdoteSlice.reducer
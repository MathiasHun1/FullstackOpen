import { createSlice } from "@reduxjs/toolkit"

// export const filterByText = (text) => {
//   return {
//     type: 'FILTER',
//     payload: {
//       text
//     }
//   }
// }

// const filterReducer = (state='', action) => {
//   switch (action.type) {
//     case 'FILTER': 
//       return action.payload.text
//     default: 
//       return state
//   }
// }

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterAnecdotes: (state='', action) => {
      return action.payload
    }
  }
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer
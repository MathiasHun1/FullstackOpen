import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notofication',
  initialState: '',
  reducers: {
    createNotification: (state, action) => {
      return action.payload
    },
    removeNotification: (state, action) => {
      return state = ''
    }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
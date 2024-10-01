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

export const setNotification = (text, delay) => async (dispatch, getState) => {
  dispatch(createNotification(text))
  setTimeout(() => {
    dispatch(removeNotification())
  }, delay)
}

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
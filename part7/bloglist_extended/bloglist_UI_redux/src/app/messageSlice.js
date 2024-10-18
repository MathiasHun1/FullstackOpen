import { createSlice } from "@reduxjs/toolkit"


export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        value: ''
    },
    reducers: {
        createMessage: (state, action) => {
            state.value = action.payload
        },
        resetMessage: state => {
            state.value = ''
        } 
    }
})

export const { createMessage, resetMessage } = messageSlice.actions
export default messageSlice.reducer
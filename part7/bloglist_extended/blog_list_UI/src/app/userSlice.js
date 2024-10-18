import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            const loggedInUser = action.payload
            return loggedInUser
        },
        clearUser(state, action) {
            return null
        } 
    }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
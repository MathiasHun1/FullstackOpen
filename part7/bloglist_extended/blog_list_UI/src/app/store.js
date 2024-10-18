import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './messageSlice'
import blogsReducer from './blogSlice'
import userReducer from './userSlice'

export const store = configureStore({
    reducer: {
        message: messageReducer,
        blogs: blogsReducer,
        user: userReducer
    }
})
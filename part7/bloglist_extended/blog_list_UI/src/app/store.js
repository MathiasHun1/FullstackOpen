import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './messageSlice'
import blogsReducer from './blogSlice'

export const store = configureStore({
    reducer: {
        message: messageReducer,
        blogs: blogsReducer
    }
})
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import blogService from '../services/blogs'


export const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setAll(state, action) {
            return action.payload
        },
        append(state, action) {
            state.push(action.payload)
        }
    },
})


export const { blogsLoading, setAll, create, append } = blogSlice.actions

export const initializeBlogs = () => async (dispatch) => {
    const blogList = await blogService.getAll()
    dispatch(setAll(blogList))
}

export const createBlog = (user, content) => async (dispatch) => {
    blogService.setToken(user)
    const newBlog = await blogService.create(content)
    dispatch(append(newBlog))
}

export default blogSlice.reducer
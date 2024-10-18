import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import blogService from '../services/blogs'
import { createMessage, resetMessage } from "./messageSlice";


export const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setAll(state, action) {
            return action.payload
        },
        append(state, action) {
            state.push(action.payload)
        },
        remove(state, action) {
            const id = action.payload
            const blogToDeleteIndex = state.findIndex(blog => blog.id === id)
            state.splice(blogToDeleteIndex, 1)
        },
        restore(state, action) {
            const { blogToDelete, blogToDeleteIndex } = action.payload
            state.push(blogToDelete)
        },
        addLikeFor(state, action) {
            const likedBlog = action.payload
            
            return state.map(blog => blog.id === likedBlog.id
                ? {...likedBlog, user: blog.user}
                : blog
            )
        }
    },
})


export const { setAll, create, append, remove, restore, addLikeFor } = blogSlice.actions

export const initializeBlogs = () => async (dispatch) => {
    const blogList = await blogService.getAll()
    dispatch(setAll(blogList))
}

export const createBlog = (user, content) => async (dispatch) => {
    try {
        blogService.setToken(user)
        const newBlog = await blogService.create(content)
        const blogToAppend = {
            ...newBlog,
            user: {
                name: user.name
            }
        }
        dispatch(append(blogToAppend))
    } catch (err) {
        dispatch(createMessage(err.message))
        setTimeout(() => { dispatch(resetMessage()) }, 3000)
    }
}

export const deleteBlog = (user, id) => async (dispatch, getState) => {
    if (window.confirm('Are you sure to delete this blog?')) {
        blogService.setToken(user)
    
        try {
            await blogService.deleteBlog(id)
            dispatch(remove(id))
        } catch (err) {
            if (err.status === 401) {
                dispatch(createMessage('You are not allowed to delete this blog'))
            } else {
                dispatch(createMessage(err.message))
            }
            setTimeout(() => { dispatch(resetMessage()) }, 3000)
        }
    }
}

export const addLike = (blog) => async (dispatch) => {
    try {
        const likedBlog = await blogService.addLike(blog.id)
        
        dispatch(addLikeFor(likedBlog))
        dispatch(createMessage(`You liked blog: ${blog.title}`))
    } catch (err) {
        dispatch(createMessage(
            `You can't like this blog... 
            \nReason: ${err.message}`
        ))
    }
    setTimeout(() => {
        dispatch(resetMessage())
    }, 3000)
} 

export default blogSlice.reducer
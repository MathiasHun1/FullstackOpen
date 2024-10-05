
export const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'vote': 
            return `anecdote ${action.payload} is voted`
        
        case 'add':
            return `anecdote ${action.payload} is added`
            
        case 'tooShort':
            return 'too short anecdote, must be 5 letters or more'
    
        case 'remove': 
            return ''
    }
}


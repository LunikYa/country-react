const userReducer = (state = {}, action) => {
    console.log('reducer action', action)
    switch (action.type) {
        case 'CHANGE_PATH':
            return {
                user: action.user,
            }
        default:
            return state
    }
}

export default userReducer

const countriesReducer = (state = {}, action) => {
    console.log('reducer action', action)
    switch (action.type) {
        case 'ADD_COUNTRIES':
            return {
                data: action.data,
                completed: true
            }
        default:
            return state
    }
}

export default countriesReducer

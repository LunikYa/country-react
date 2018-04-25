import * as types from '../constants';

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case types.LOGIN_USER:
            return {
                user: action.payload,
            }
        default:
            return state
    }
}

export default userReducer;
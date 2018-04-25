import { LOGIN_USER, REGISTER_USER } from '../constants';

let initialState = { 
    loginedUser: '', 
    users: [{ email: 'vasya@com.ua', password: '123456' }] 
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                loginedUser: action.payload,
            }
        case REGISTER_USER:
            return {
                users: Object.assign([], state.users, action.payload),
                loginedUser: action.payload.email
            }
        default:
            return state
    }
}

export default userReducer;
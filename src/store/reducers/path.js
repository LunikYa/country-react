import * as types from '../constants';

const pathReducer = (state = { path: 'login' }, action) => {
    switch (action.type) {
        case types.CHANGE_PATH: {
            return {
                path: action.payload
            }
        }
        default:
            return state
    }
}

export default pathReducer;
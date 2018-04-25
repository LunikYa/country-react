import { CHANGE_PATH } from '../constants';

const pathReducer = (state = { path: 'login' }, action) => {
    switch (action.type) {
        case CHANGE_PATH: {
            return {
                path: action.payload
            }
        }
        default:
            return state
    }
}

export default pathReducer;
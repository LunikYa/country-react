import * as types from '../constants';

let initialState = {
    cities: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CITIES_SUCCES:
            return { ...state, ...{ cities: action.payload } }

        case types.FILTER_CITY:
            return { ...state, ...{ cities: action.payload } }

        default:
            return state
    }
}
import * as types from '../constants';

let initialState = {
    countries: [],
    cities: [],
    countriesCompleted: false,
    citiesCompleted: false,
}

const countriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_COUNTRIES_SUCCES:
            return {...state, ...{ countries: action.payload, countriesCompleted: true }}
        case types.GET_CITIES_SUCCES:
            return { ...state, ...{ cities: action.payload, citiesCompleted: true } }
        case types.GET_COUNTRIES_ERROR:
            return {...state, ...{ completed: false, data: action.payload }}
        case types.FILTER_COUNTRY:
            return { ...state, ...{ countries: action.payload } }
        case types.FILTER_CITY:
            return { ...state, ...{ cities: action.payload } }
        
        default:
            return state
    }
}

export default countriesReducer;
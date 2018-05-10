import * as types from '../constants';

let initialState = {
    countries: [],
    cities: [],
    currentCountry: {},
    countriesLoaded: false
}

const countriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_COUNTRIES_SUCCES:
            return { ...state, ...{ countries: action.payload, countriesLoaded: true, currentCountry: action.payload[0]}}

        case types.GET_CITIES_SUCCES:
            return { ...state, ...{ cities: action.payload } }

        case types.GET_COUNTRIES_ERROR:
            return {...state, ...{ completed: false, data: action.payload }}

        case types.FILTER_COUNTRY:
            return { ...state, ...{ countries: action.payload, currentCountry: action.payload[0]} }
            
        case types.FILTER_CITY:
            return { ...state, ...{ cities: action.payload } }
        
        case types.CHOOSE_COUNTRY:
            return { ...state, ...{ currentCountry: action.payload }}

        default:
            return state
    }
}

export default countriesReducer;
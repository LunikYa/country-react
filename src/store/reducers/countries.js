import * as types from '../constants';

let initialState = {
    allCountries: [],
    allCities: [],
    filtredCountries: [],
    filtredCities: [],
    all: [],
    completed: false
}

const countriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_COUNTRIES_SUCCES:
            return {
                allCountries: action.countries,
                allCities: action.cities,
                filtredCountries: action.countries,
                filtredCities: action.cities,
                all: action.all,
                completed: true
            }
        case types.GET_COUNTRIES_ERROR:
            return {
                completed: false,
                data: action.payload
            }
        case types.FILTER_COUNTRY:
            return { ...state, ...{ filtredCountries: action.payload } }
        case types.FILTER_CITY:
            return { ...state, ...{ filtredCities: action.payload } }
        case types.CHANGE_CITIES:
            return { ...state, ...{ filtredCities: action.payload, allCities: action.payload } }
        default:
            return state
    }
}

export default countriesReducer;
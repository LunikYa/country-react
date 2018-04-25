import { GET_COUNTRIES_ERROR,
         GET_COUNTRIES_SUCCES,
         FILTER_COUNTRY,
         FILTER_CITY,
         CHANGE_CITIES } from '../constants';

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
        case GET_COUNTRIES_SUCCES:
            return {
                allCountries: action.countries,
                allCities: action.cities,
                filtredCountries: action.countries,
                filtredCities: action.cities,
                all: action.all,
                completed: true
            }
        case GET_COUNTRIES_ERROR:
            return {
                completed: false,
                data: action.payload
            }
        case FILTER_COUNTRY:
            return { ...state, ...{ filtredCountries: action.payload } }
        case FILTER_CITY:
            return { ...state, ...{ filtredCities: action.payload } }
        case CHANGE_CITIES:
            return { ...state, ...{ filtredCities: action.payload, allCities: action.payload } }
        default:
            return state
    }
}

export default countriesReducer;
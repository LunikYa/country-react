import { combineReducers } from 'redux';
import {    GET_COUNTRIES_ERROR, 
            GET_COUNTRIES_SUCCES,
            CHANGE_PATH,
            LOGIN_USER,
            REGISTER_USER,
            FILTER_COUNTRY,
            FILTER_CITY,
            CHOOSE_COUNTRY,
            CHANGE_CITIES
        } from '../constants'
import { changePath } from '../actions';

const countriesReducer = (state, action) => {
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
            return { ...state, ...{filtredCities: action.payload }}
        case CHANGE_CITIES: 
            return { ...state, ...{ filtredCities: action.payload, allCities: action.payload }}            
        default:
            return {
                allCountries: [],
                allCities: [],
                filtredCountries: [],
                filtredCities: [],
                all: [],
                completed: false
            }
    }
}
const pathReducer = (state = {path: 'login'}, action) => {
    switch (action.type) {
        case CHANGE_PATH : {
            return {
                path: action.payload
            }
        }
        default: 
            return state
    }
}
const userReducer = (state = {loginedUser:'',users:[]}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                loginedUser: action.payload,
            }
        case REGISTER_USER :
            return { users: Object.assign([], state.users, action.payload),
                     loginedUser: action.payload.email}
        default:
            return state
    }
}

export default combineReducers({
    countriesState: countriesReducer,
    currentPath: pathReducer,
    userState: userReducer
})
import httpGet from '../../components/helpers';
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
import store from '../store'

const getCountries = data => {
    return dispatch => {
        httpGet('https://raw.githubusercontent.com/meMo-Minsk/all-countries-and-cities-json/master/countries.min.json')
            .then(
                resolve => {
                    let tempCountries = [];
                    for (let key in resolve) {
                        tempCountries.push(key);
                    }
                    let tempCities = [];
                    for (let i = 0; tempCities.length < 50; i++) {
                        resolve[tempCountries[i]].forEach((x) => { tempCities.push(x) })
                    }
                    dispatch({
                        type: GET_COUNTRIES_SUCCES,
                        countries: tempCountries,
                        cities: tempCities,
                        all: resolve
                    })
                },
                reject => {
                    dispatch({
                        type: GET_COUNTRIES_ERROR,
                        payload: reject
                    })
                }
            );
        }
}

const changePath = path => ({
    type: CHANGE_PATH,
    payload: path
})

const loginUser = email => ({
    type: LOGIN_USER,
    payload: email
})

const registerUser = user => ({
    type: REGISTER_USER,
    payload: user
})

const filterCountry = val =>{
    let filtredArr = (store.getState().countriesState.allCountries.filter((a) => {
        return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
    }))
    if (filtredArr.length === 0) {
        filtredArr.push('No matches');
    }
    return {
        type: FILTER_COUNTRY,
        payload: filtredArr
    }
}

const filterCity = val => {
    let filtredArr = (store.getState().countriesState.allCities.filter((a) => {
        return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
    }))
    if (filtredArr.length === 0) {
        filtredArr.push('No matches');
    }
    return {
        type: FILTER_CITY,
        payload: filtredArr
    }
}

const changeCitiesBySlicedCountries = () => {    
    let temp = [],
        slice = store.getState().countriesState.filtredCountries.slice(0, 3);

    if (slice[0] === 'No matches') {
        temp.push('No matches')
    } else {
        for (let i = 0; i < slice.length; i++) {
            store.getState().countriesState.all[slice[i]].forEach(x => { temp.push(x) })
        }
    }
    return {
        type: CHANGE_CITIES,
        payload: temp
    }
}

const choosedCountry = country => {
    return {
        type: CHANGE_CITIES,
        payload: store.getState().countriesState.all[country]
    }
}

export 
{ 
    getCountries, 
    changePath, 
    loginUser, 
    registerUser, 
    filterCity, 
    filterCountry, 
    changeCitiesBySlicedCountries, 
    choosedCountry
}
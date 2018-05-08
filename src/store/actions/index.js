import { httpGet } from '../../components/helpers';
import * as types  from '../constants';

export const loginUser = user => ({ type: types.LOGIN_USER, payload: user})

export const getCountries = () => {
    return (dispatch, getState) => {
        httpGet('http://localhost:3000/countries', getState().user.user.token || null)
            .then(
                resolve => {
                    dispatch({
                        type: types.GET_COUNTRIES_SUCCES,
                        payload: resolve
                    })
                },
                reject => {
                    dispatch({
                        type: types.GET_COUNTRIES_ERROR,
                        payload: reject
                    })
                }
            );
    }
}

export const getCities = () => {
    return (dispatch, getState) => {
        let val = getState().countriesState.currentCountry._id;
        httpGet(`http://localhost:3000/cities/${val}`, getState().user.user.token || null)
            .then(
                resolve => {
                    dispatch({
                        type: types.GET_CITIES_SUCCES,
                        payload: resolve
                    })
                }
            )
    }
}

export const filterCountry = val =>{
    return (dispatch, getState) => {
        httpGet(`http://localhost:3000/countries/filtred/${val}`, getState().user.user.token || null)
            .then(
                resolve => {
                    dispatch({
                        type: types.FILTER_COUNTRY,
                        payload: resolve
                    })
                }
            )        
    }
}

export const filterCity = val => {
    return (dispatch, getState) => {
        let countryId = getState().countriesState.currentCountry._id;
        httpGet(`http://localhost:3000/cities/filtred/${val}/${countryId}`, getState().user.user.token || null)
            .then(
                resolve => {
                    dispatch({
                        type: types.FILTER_CITY,
                        payload: resolve
                    })
                }
            ) 
    }
}

export const chooseCountry = (country) => {
    return {
        type: types.CHOOSE_COUNTRY,
        payload: country
    }
}
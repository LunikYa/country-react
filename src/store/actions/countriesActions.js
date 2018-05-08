import { httpGet } from '../../components/helpers';
import * as types from '../constants';

export const getCountries = (token) => {
    return (dispatch, getState) => {
        httpGet('http://localhost:3000/countries', token)
            .then(
                countries => {
                    dispatch({
                        type: types.GET_COUNTRIES_SUCCES,
                        payload: countries
                    })
                },
                error => {
                    dispatch({
                        type: types.GET_COUNTRIES_ERROR,
                        payload: error
                    })
                }
            );
    }
}

export const getCities = (val, token) => {
    return (dispatch, getState) => {
        httpGet(`http://localhost:3000/cities/${val}`, token)
            .then(
                cities => {
                    dispatch({
                        type: types.GET_CITIES_SUCCES,
                        payload: cities
                    })
                }
            )
    }
}

export const filterCountry = (val, token) =>{
    return (dispatch, getState) => {
        httpGet(`http://localhost:3000/countries/filtred/${val}`, token)
            .then(
                countries => {
                    dispatch({
                        type: types.FILTER_COUNTRY,
                        payload: countries
                    })
                }
            )        
    }
}

export const filterCity = (val, token) => {
    return (dispatch, getState) => {
        httpGet(`http://localhost:3000/cities/filtred/${val}`, token)
            .then(
                cities => {
                    dispatch({
                        type: types.FILTER_CITY,
                        payload: cities
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
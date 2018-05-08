import { httpGet } from '../../components/helpers';
import * as types  from '../constants';

export const loginUser = user => {
    return {
        type: types.LOGIN_USER,
        payload: user
    }
}
export const getCountries = () => {
    return (dispatch, getState) => {
        httpGet('http://localhost:3000/countries', localStorage.getItem('token'))
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

export const getCities = (val) => {
    return (dispatch, getState) => {
        httpGet(`http://localhost:3000/cities/${val}`, localStorage.getItem('token'))
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

export const filterCountry = val =>{
    return (dispatch, getState) => {
        httpGet(`http://localhost:3000/countries/filtred/${val}`, localStorage.getItem('token'))
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

export const filterCity = val => {
    return (dispatch, getState) => {
        httpGet(`http://localhost:3000/cities/filtred/${val}`, localStorage.getItem('token'))
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
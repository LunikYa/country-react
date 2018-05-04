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

export const getCities = (data) => {
    return (dispatch, getState) => {
        let val = data || getState().countriesState.countries[1];
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
    if(!val) val = 'all'
    return (dispatch, getState) => {
        httpGet(`http://localhost:3000/cities/filtred/${val}`, getState().user.user.token || null)
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

import { httpGet } from '../../helpers';
import * as types from '../constants';

export const getCountries = () => {
    return (dispatch, getState) => {
        httpGet('http://localhost:3000/countries')
            .then(
                countries => {
                    dispatch({
                        type: types.GET_COUNTRIES_SUCCES,
                        payload: countries
                    })
                }
            );
    }
}

export const filterCountries = val =>{
    return (dispatch) => {
        httpGet(`http://localhost:3000/countries/filtred/${val}`)
            .then(
                countries => {
                    dispatch({
                        type: types.FILTER_COUNTRY,
                        payload: countries
                    })
                }
            );  
    }
}

export const chooseCountry = (countryId) => {
    return {
        type: types.CHOOSE_COUNTRY,
        payload: countryId
    }
}

export const getCountryByCity = (cityId) => {
    return (dispatch) => {
        httpGet(`http://localhost:3000/country/${cityId}`)
            .then(
                country => {
                    dispatch({
                        type: types.GET_COUNTRY_BY_CITY,
                        payload: country
                    })
                }
            )
    }

}
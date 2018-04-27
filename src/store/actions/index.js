import httpGet from '../../components/helpers';
import * as types from '../constants';

export const loginUser = user => ({ type: types.LOGIN_USER, payload: user})

export const getCountries = () => {
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
                        type: types.GET_COUNTRIES_SUCCES,
                        countries: tempCountries,
                        cities: tempCities,
                        all: resolve
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

export const filterCountry = val =>{
    return (dispatch, getState) => {
        let filtredArr = (getState().countriesState.allCountries.filter((a) => {
            return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
        }))
        if (filtredArr.length === 0) {
            filtredArr.push('No matches');
        }
        dispatch({
            type: types.FILTER_COUNTRY,
            payload: filtredArr
        })
    }
}

export const filterCity = val => {
    return (dispatch, getState) => {
        let filtredArr = (getState().countriesState.allCities.filter((a) => {
           return !(a.toLowerCase().indexOf(val.toLowerCase()) !== 0);
        }))
        if (filtredArr.length === 0) {
            filtredArr.push('No matches');
        }
        dispatch({
            type: types.FILTER_CITY,
            payload: filtredArr
        })
    }
}

export const changeCitiesBySlicedCountries = () => {
    return (dispatch, getState) => { 
        let temp = [],
            slice = getState().countriesState.filtredCountries.slice(0, 3);

        if (slice[0] === 'No matches') {
            temp.push('No matches')
        } else {
            for (let i = 0; i < slice.length; i++) {
                getState().countriesState.all[slice[i]].forEach(x => { temp.push(x) })
            }
        }
        dispatch({
            type: types.CHANGE_CITIES,
            payload: temp
        })
    }
}

export const choosedCountry = country => {
    return (dispatch, getState) => {
        dispatch({
            type: types.CHANGE_CITIES,
            payload: getState().countriesState.all[country]
        })
    }
}
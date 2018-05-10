import { http } from '../../helpers';
import * as types from '../constants';

export const getCities = val => {
    return (dispatch) => {
        http(`http://localhost:3000/cities/${val}`, 'GET')
            .then(
                cities => {
                    dispatch({
                        type: types.GET_CITIES_SUCCES,
                        payload: cities
                    })
                }
            );
    }
}

export const filterCities = val => {
    return (dispatch) => {
        http(`http://localhost:3000/cities/filtred/${val}`, 'GET')
            .then(
                cities => {
                    dispatch({
                        type: types.FILTER_CITY,
                        payload: cities
                    })
                }
            );
    }
}

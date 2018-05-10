import { httpGet } from '../../helpers';
import * as types from '../constants';

export const getCities = val => {
    return (dispatch) => {
        httpGet(`http://localhost:3000/cities/${val}`)
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
        httpGet(`http://localhost:3000/cities/filtred/${val}`)
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

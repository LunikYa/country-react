import { httpPost } from '../../components/helpers';
import { push }   from 'react-router-redux';
import * as types from '../constants';

export const loginUser = tempUser => {
    return (dispatch, getState) => {
        httpPost(`http://localhost:3000/login`, tempUser)
            .then(
            user => {
                dispatch({
                    type: types.LOGIN_USER,
                    payload: user
                })
                dispatch(push('/country'))
            }, error => {
                console.log('reject', error)
            })
    }  
}

export const regUser = regUser => {
    return (dispatch, getState) => {
        httpPost(`http://localhost:3000/register`, regUser)
            .then(
            user => {
                dispatch({
                    type: types.LOGIN_USER,
                    payload: user
                })
                dispatch(push('/country'))
            }, error => {
                console.log('reject', error)
            })
    }
}
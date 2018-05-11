import { http } from '../../helpers';
import { push }   from 'react-router-redux';
import * as types from '../constants';

export const loginUser = logUser => {
    return (dispatch) => {
        http(`http://localhost:3000/login`, 'POST', logUser)
            .then(
                user => {
                    localStorage.setItem('token', user.token)
                    dispatch({
                        type: types.LOGIN_USER,
                        payload: user
                    })
                    dispatch(push('/country'))
                }, error => {
                    console.log('reject', error)
                });
    }  
}

export const regUser = regUser => {
    return (dispatch) => {
        http(`http://localhost:3000/register`, 'POST', regUser)
            .then(
                user => {
                    localStorage.setItem('token', user.token)
                    dispatch({
                        type: types.LOGIN_USER,
                        payload: user
                    })
                    dispatch(push('/country'))
                }, error => {
                    console.log('reject', error)
                });
    }
}
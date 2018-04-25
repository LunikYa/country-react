import { combineReducers } from 'redux';
import countriesReducer    from './countries';
import pathReducer         from './path';
import userReducer         from './users';

export default combineReducers({
    countriesState: countriesReducer,
    currentPath: pathReducer,
    userState: userReducer
});
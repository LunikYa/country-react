import { combineReducers } from 'redux';
import countriesReducer from './countries';
import userReducer from './user';

export default combineReducers({
    countriesReducer,
    userReducer
})
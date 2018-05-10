import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import countriesReducer    from './countryReducer';
import citiesReducer       from './cityReducer';
import userReducer         from './usersReducer';

export default combineReducers({
    countriesState: countriesReducer,
    citiesState:    citiesReducer,
    userState:      userReducer,
    router:         routerReducer
});


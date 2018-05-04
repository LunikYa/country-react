import { combineReducers } from 'redux';
import countriesReducer    from './countries';
import userReducer         from './users';
import { routerReducer }   from 'react-router-redux';

export default combineReducers({
    countriesState: countriesReducer,
    user:           userReducer,
    router:         routerReducer
});


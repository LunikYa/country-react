import React                from 'react';
import rootReducer          from './reducers/index';
import thunk                from 'redux-thunk';
import createHistory        from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';

export const history = createHistory()
const middleware     = routerMiddleware(history)
 
const store = createStore(rootReducer, applyMiddleware(middleware, thunk));

export default store;

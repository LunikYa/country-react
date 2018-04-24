import React from 'react';
import { createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'

// const logger = createLogger()
const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store
// console.log('create store', store)
import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';

// REDUCERS // 
import userReducer from './ducks/userReducer';
import storeReducer from './ducks/storeReducer';


// ROOT REDUCER //
const rootReducer = combineReducers({
    user: userReducer,
    store: storeReducer
})

// STORE // 
const middleware = applyMiddleware(promise);
export default createStore(rootReducer, middleware);
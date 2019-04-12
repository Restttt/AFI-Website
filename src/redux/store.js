import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';

// REDUCERS // 
import userReducer from './ducks/userReducer';


// ROOT REDUCER //
const rootReducer = combineReducers({
    user: userReducer
})

// STORE // 
const middleware = applyMiddleware(promise);
export default createStore(rootReducer, middleware);
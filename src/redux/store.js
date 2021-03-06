import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';

// REDUCERS // 
import userReducer from './ducks/userReducer';
import storeReducer from './ducks/storeReducer';
import shoppingReducer from './ducks/shoppingReducer';
import chartReducer from './ducks/chartReducer';


// ROOT REDUCER //
const rootReducer = combineReducers({
    user: userReducer,
    store: storeReducer,
    cart: shoppingReducer,
    chart: chartReducer
})

// STORE // 
const middleware = applyMiddleware(promise);
export default createStore(rootReducer, middleware);
import axios from 'axios';
import Alert from 'react-s-alert';

const initialState = {
    cart: [],
    total: 0
}

// ACTION TYPES //
const CHANGED_CART = "CHANGED_CART";
const EMPTY_CART = "EMPTY_CART";

// ACTION CREATORS //
export function addToCart(product) {
    const newCart = axios.post('/api/store/addItem', product).then(res => {
        return res.data;
    });
    return {
        type: CHANGED_CART,
        payload: newCart
    }
}

export function deleteFromCart(productIndex) {
    const newCart = axios.post('/api/store/removeItem', productIndex).then(res => {
        return res.data;
    });
    return {
        type: CHANGED_CART,
        payload: newCart
    }
}

export function emptyCart() {
    return {
        type: EMPTY_CART,
    }
}

export function getCart() {
    const cart = axios.get('/api/store/getCart').then(res => {
        return res.data;
    });
    return {
        type: CHANGED_CART,
        payload: cart
    }
}

// REDUCER //
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case CHANGED_CART + "_FULFILLED": {
            return {...state, cart: action.payload}
        }
        case CHANGED_CART + "_REJECTED": {
            Alert.error('Not enough in inventory. Please call the store for more info.', {
                position: 'top-right',
                effect: 'genie',
                beep: false,
                timeout: 10000,
                offset: 100
            });
            return {...state}
        }
        case EMPTY_CART: {
            return {...state, initialState};
        }
        default: {
            return {...state}
        }
    };
};
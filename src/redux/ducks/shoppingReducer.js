import axios from 'axios';

const initialState = {
    cart: [],
    total: 0
}

// ACTION TYPES //
const CHANGED_CART = "CHANGED_CART";

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
        default: {
            return {...state}
        }
    };
};
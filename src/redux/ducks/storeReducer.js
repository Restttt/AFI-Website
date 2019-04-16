import axios from 'axios';

const initialState = {
    products: [],
    loading: false
};

//ACTION TYPES 
const GET_PRODUCTS = "GET_PRODUCTS";
const GET_CATEGORY = "GET_CATEGORY";

// ACTION CREATORS //
export function getAllProducts() {
    let products = axios.get('/api/store/getAll').then(res => {
        return res.data;
    });
    return {
        type: GET_PRODUCTS,
        payload: products
    };
};

export function getByCategory(category) {
    let products = axios.post('/api/store/getByCategory', category).then(res => {
        return res.data;
    });
    return {
        type: GET_CATEGORY,
        payload: products
    };
}

// REDUCER // 
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS + "_PENDING": {
            return {...state, loading: true}
        }
        case GET_PRODUCTS + "_FULFILLED": {
            return {...state, loading: false, products: action.payload}
        }
        case GET_CATEGORY + "_PENDING": {
            return {...state, loading: true}
        }
        case GET_CATEGORY + "_FULFILLED": {
            return {...state, loading: false, products: action.payload}
        }
        default: {
            return {...state}
        }
    };
};
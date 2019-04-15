import axios from 'axios';

const initialState = {
    email: null,
    name: null,
    company: null,
    admin: false,
    loading: false,
    message: null
}

// ACTION TYPES //
const LOGIN = "LOGIN"


// ACTION CREATORS //
export function loginUser(loginInfo) {
    let login = axios.post('/auth/login', loginInfo).then(res => {
        return res.data;
    });
    return {
        type: LOGIN,
        payload: login
    };
};


// REDUCER //
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN + "_PENDING": {
            return {...state, loading: true}
        }
        case LOGIN + "_FULFILLED": {
            return {...state, loading: false, email: action.payload.email, name: action.payload.customer_name, admin: action.payload.is_admin, company: action.payload.company}
        }
        case LOGIN + "_REJECTED": {
            return {...state, loading: false, message: action.payload}
        }
        default: {
            return state;
        };
    };
};
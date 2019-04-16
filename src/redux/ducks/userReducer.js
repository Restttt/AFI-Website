import axios from 'axios';

const initialState = {
    email: null,
    name: null,
    company: null,
    admin: false,
    message: null
};

// ACTION TYPES //
const LOGIN = "LOGIN";
const REGISTER = "REGISTER";


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

export function registerUser(registerInfo) {
    let register = axios.post('/auth/register', registerInfo).then(res => {
        return res.data;
    });
    return {
        type: REGISTER,
        payload: register
    };
};


// REDUCER //
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN + "_PENDING": {
            return {...state}
        }
        case LOGIN + "_FULFILLED": {
            return {...state, email: action.payload.email, name: action.payload.customer_name, admin: action.payload.is_admin, company: action.payload.company}
        }
        case LOGIN + "_REJECTED": {
            alert(action.payload.response.data);
            return {...state, message: action.payload}
        }
        case REGISTER + "_PENDING": {
            return {...state}
        }
        case REGISTER + "_FULFILLED": {
            return {...state, email: action.payload.email, name: action.payload.customer_name, admin: action.payload.is_admin, company: action.payload.company}
        }
        case REGISTER + "_REJECTED": {
            alert(action.payload.response.data);
            return {...state, message: action.payload}
        }
        default: {
            return state;
        }
    };
};
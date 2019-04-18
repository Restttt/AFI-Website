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
const GET_USER = "GET_USER"
const GET_ADDRESS = "GET_ADDRESS"
const LOGOUT = "LOGOUT"


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

export function logout() {
    let loggedOut = axios.delete('/auth/logout').then(res => {
        return reducer.data
    });
    return {
        type: LOGOUT,
        payload: loggedOut
    }
}

export function getAccount() {
    let user = axios.get('/auth/getAccount').then(res => {
        return res.data
    });
    return {
        type: GET_USER,
        payload: user
    }
}

export function getAddressAndAccount(email) {
    let user = axios.post('/auth/getCustomerAddress', email).then(res => {
        return res.data
    });
    return {
        type: GET_ADDRESS,
        payload: user
    }
}

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
        case GET_USER + "_FULFILLED": {
            if (action.payload.email && action.payload.email !== null) {
                return {...state, email: action.payload.email, name: action.payload.customer_name, admin: action.payload.is_admin, company: action.payload.company}
            } else {
                return {...state}
            }
        }
        case GET_ADDRESS + "_FULFILLED": {
            console.log(action.payload);
            return {
                ...state, 
                email: action.payload.email, 
                name: action.payload.customer_name, 
                admin: action.payload.is_admin, 
                company: action.payload.company,
                address1: action.payload.address1,
                address2: action.payload.address2,
                city: action.payload.city,
                state: action.payload.state,
                zipcode: action.payload.zip
            }
        }
        case GET_ADDRESS + "_REJECTED": {
            alert(action.payload.response.data)
            return {...state, message: action.payload.response.data}
        }
        case LOGOUT + "_FULFILLED": {
            return {initialState}
        }
        default: {
            return state;
        }
    };
};
import axios from 'axios';

const initialState = {
    email: null,
    name: null,
    company: null,
    admin: false
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
        default: {
            return state;
        };
    };
};
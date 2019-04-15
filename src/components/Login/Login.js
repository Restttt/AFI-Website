import React, {Component} from 'react';
import { HashRouter, Link } from 'react-router-dom';

import Header from '../shared/Header/Header';
import './Login.scss';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    updateEvent = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    }

    sendMessage = () => {
        const login = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(login);
    };
    render() {
        return(
            <HashRouter>
            <div>
                <Header />
                <div className="login-page-parent">
                    <div className="login-inputs-box">
                        <h1>LOG IN TO AFI</h1>
                        <div className="login-inputs-container">
                            <input placeholder="email" type="text" name="email" value={this.state.email} className="login-email" onChange={this.updateEvent}></input>
                            <input placeholder="password" type="password" name="password" value={this.state.password} className="login-password" onChange={this.updateEvent}></input>
                        </div>
                        <h5>Forgot your password?</h5>
                        <div className="login-buttons">
                            <button>Login</button>
                            <Link className="link" to='/register'><button>Register</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            </HashRouter>
        );
    };
};

export default Login
import React, {Component} from 'react';
import { HashRouter, Link } from 'react-router-dom';
import Alert from 'react-s-alert';

// Components and style
import Header from '../shared/Header/Header';
import Footer from '../shared/Footer/Footer';
import './Login.scss';

// Redux
import {loginUser} from '../../redux/ducks/userReducer';
import {connect} from 'react-redux';

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

    attemptLogin = async () => {
        const login = {
            email: this.state.email,
            password: this.state.password
        };
        await this.props.loginUser(login)
        if (this.props.user.email) {
            Alert.success(`Welcome ${this.props.user.name}`, {
                position: 'top-right',
                effect: 'genie',
                beep: false,
                timeout: 2000,
                offset: 100
            });
            const {history} = this.props
            history.push('/store');
        } 
    };

    componentDidMount() {
        if (this.props.user.email) {
            this.props.history.push('/store');
        };
    }

    render() {
        return(
            <HashRouter>
            <div>
                <Header />
                <div className="login-page-parent">
                    <div className="login-inputs-box">
                        <h1>LOGIN TO AFI</h1>
                        <div className="login-inputs-container">
                            <input placeholder="email" type="text" name="email" value={this.state.email} className="login-email" onChange={this.updateEvent}></input>
                            <input placeholder="password" type="password" name="password" value={this.state.password} className="login-password" onChange={this.updateEvent}></input>
                        </div>
                        <h5>Forgot your password?</h5>
                        <div className="login-buttons">
                            <button onClick={() => this.attemptLogin()}>LOG IN</button>
                            <Link className="link" to='/register'><button>REGISTER</button></Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            </HashRouter>
        );
    };
};

function mapStateToProps(reduxState) {
    return {
        user: reduxState.user
    };
};

export default connect(mapStateToProps, {loginUser})(Login)
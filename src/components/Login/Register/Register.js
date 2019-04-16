import React, {Component} from 'react';
import {registerUser} from '../../../redux/ducks/userReducer';
import {connect} from 'react-redux';

import './Register.scss';
import Header from '../../shared/Header/Header';
import Footer from '../../shared/Footer/Footer';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: '',
            company: '',
            password1: '',
            password2: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zipcode: '',
        };
    };

    changeEvent = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    }

    submitRegister = async () => {
        if (this.state.password1 !== this.state.password2) {
            alert("passwords do not match");
        } else {
            const registerInfo = {
                email: this.state.email,
                name: this.state.name,
                company: this.state.company,
                password: this.state.password1,
                address1: this.state.address1,
                address2: this.state.address2,
                city: this.state.city,
                state: this.state.state,
                zipcode: this.state.zipcode,
            };
            await this.props.registerUser(registerInfo);
            console.log(this.props);
            if (this.props.userInfo.email) {
                const {history} = this.props
                history.push('/');
            } 
        };
    };

    render() {
        return(
            <div>
                <Header />
                    <div className="register-container">
                        <div className="register-parent-box">
                        <h1>Register An Account</h1>
                        <h6>Passwords must match, all fields are required for registration. If a field does not apply to you, put in NA</h6>
                        <div className="register-inputs-parent">
                            <div className="register-input-box1">
                                <input name="email" type="text" placeholder="Email" value={this.state.value} onChange={this.changeEvent} />
                                <input name="password1" type="password" placeholder="Password" value={this.state.password1} onChange={this.changeEvent} />
                                <input name="password2" type="password" placeholder="Confirm Password" value={this.state.password2} onChange={this.changeEvent} />
                                <input name="name" type="text" placeholder="Name" value={this.state.name} onChange={this.changeEvent} />
                                <input name="company" type="text" placeholder="Company" value={this.state.company} onChange={this.changeEvent} />
                            </div>
                            <div className="register-input-box2">
                                <input name="address1" type="text" placeholder="Address1" value={this.state.address1} onChange={this.changeEvent} />
                                <input name="address2" type="text" placeholder="Address2" value={this.state.address2} onChange={this.changeEvent} />
                                <input name="city" type="text" placeholder="City" value={this.state.city} onChange={this.changeEvent} />
                                <input name="state" type="text" placeholder="State" value={this.state.state} onChange={this.changeEvent} />
                                <input name="zipcode" type="number" placeholder="Zipcode" value={this.state.zipcode} onChange={this.changeEvent} />
                            </div>
                        </div>
                        <button onClick={() => this.submitRegister()}>Register</button>
                        </div>
                    </div>
                <Footer />
            </div>
        );
    };
};

function mapStateToRedux(reduxState) {
    return {
        userInfo: reduxState.user
    };
};


export default connect(mapStateToRedux, {registerUser})(Register);
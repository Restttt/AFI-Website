import React, {Component} from 'react';
import {registerUser} from '../../../redux/ducks/userReducer';
import {connect} from 'react-redux';
import Alert from 'react-s-alert';

import './Register.scss';
import NewHeader from '../../shared/AppBar';
import Footer from '../../shared/Footer/Footer';
import RegisterForms from './RegisterForms';


class Register extends Component {
    componentDidMount() {
        if (this.props.user.id) {
            Alert.error('You are already logged in', {
                position: 'top-right',
                effect: 'genie',
                beep: false,
                timeout: 2000,
                offset: 100
            });
            this.props.history.push('/store');
        }
    }
    render() {
        return(
            <div>
                <NewHeader history={this.props.history}/>
                <div className="register-parent-div">
                    <RegisterForms history={this.props.history}/>
                </div>
                <Footer />
            </div>
        )
    }
}

function mapStateToRedux(reduxState) {
    return {
        user: reduxState.user
    };
};


export default connect(mapStateToRedux, {registerUser})(Register);
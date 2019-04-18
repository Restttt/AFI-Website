import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Account.scss';
import Header from '../shared/Header/Header';
import Footer from '../shared/Footer/Footer';
import {getAccount, logout, getAddressAndAccount} from '../../redux/ducks/userReducer';

class Account extends Component { 
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }
    componentDidMount() {
        this.props.getAccount();
        setTimeout(() => {
            if (this.props.user.email && this.props.user.email !== null) {
                let email = {
                    email: this.props.user.email
                }
                this.props.getAddressAndAccount(email);
            }
        }, 500)
    }

    logoutUser = async () => {
        await this.props.logout();
        const {history} = this.props
        history.push('/');
        window.location.reload(); //THIS WILL DESTROY USER SESSION, PUSH THEM TO HOME PAGE, AND FORCE REFRESH TO UPDATE HEADER
    }

    render() {
        console.log(this.props.user);
        return( 
            <div>
                <Header />
                <button onClick={() => this.logoutUser()}>Logout</button>
                <div className="account-parent-container">
                    <h1 className="account-welcome">Welcome {this.props.user.name}</h1>
                    <div className="account-user-info">
                        <h3>Your Info:</h3>
                        <div className="account-container">
                            <div className="account-title">
                                <h4>Name:  </h4>
                                <h4>Email:  </h4>
                                <h4>Company:  </h4>
                            </div>
                            <div className="account-info">
                                {!this.state.edit ? (<h4>  {this.props.user.name}</h4>) : (<input value={this.props.user.name} />) }
                                {!this.state.edit ? (<h4>  {this.props.user.email}</h4>) : (<input value={this.props.user.email} />) }
                                <h4>  {this.props.user.company}</h4>
                            </div>
                        </div>
                        <div className="account-container">
                            <div className="account-title">
                                <h4>address1:  </h4>
                                <h4>address2:  </h4>
                                <h4>city:  </h4>
                                <h4>state:  </h4>
                                <h4>zip:  </h4>
                            </div>
                            <div className="account-info">
                                <h4>  {this.props.user.address1}</h4>
                                <h4>  {this.props.user.address2}</h4>
                                <h4>  {this.props.user.city}</h4>
                                <h4>  {this.props.user.state}</h4>
                                <h4>  {this.props.user.zip}</h4>
                            </div>
                        </div>
                        <div className="account-container">
                            <div className="account-info-test">
                                <span className="account-data"><span>address1:</span>  <span>{this.props.user.address1}</span></span>
                                <span className="account-data"><span>address2:</span>  <span>{this.props.user.address2}</span></span>
                                <span className="account-data"><span>city:</span>  <span>{this.props.user.city}</span></span>
                                <span className="account-data"><span>address1:</span>  <span>{this.props.user.address1}</span></span>
                                <span className="account-data"><span>address1:</span>  <span>{this.props.user.address1}</span></span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => this.setState({ edit: !this.state.edit })}>EDIT INFO</button>
                </div>
                <Footer />
            </div>
        );
    };
};

function mapStateToRedux(reduxState) {
    return {
        user: reduxState.user
    }
}

export default connect(mapStateToRedux, {getAccount, logout, getAddressAndAccount})(Account);
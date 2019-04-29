import React, {Component} from 'react';
import { HashRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getAccount} from '../../../redux/ducks/userReducer';

import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navActive: false,
            isTop: true
        };
    };

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.getAccount();
        document.addEventListener('scroll', () => {
          const isTop = window.scrollY < 100;
          if (isTop !== this.state.isTop) {
              this.setState({ isTop })
          }
        });
    }

    userManagementTablet = () => {
        if (this.props.user.email === null) {
            return(
                <Link className="nav-bar-link link" to='/login'><h4>LOGIN</h4></Link>
            )
        } else if (!this.props.user.admin) {
            return(
                <Link className="nav-bar-link link" to='/account'><h4>ACCOUNT</h4></Link>
            )
        } else {
            return(
                <Link className="nav-bar-link link" to='/admin/dashboard'><h4>PORTAL</h4></Link>
            )
        }
    }

    userManagementDesktop = () => {
        if (this.props.user.email === null) {
            return(
                <Link className="link rotate" to='/login'>LOGIN</Link>
            )
        } else if (!this.props.user.admin) {
            return(
                <Link className="link rotate" to='/account'>ACCOUNT</Link>
            )
        } else {
            return(
                <Link className="link rotate" to='/admin/dashboard'>PORTAL</Link>
            )
        }
    }

    render() {
        return( 
            <HashRouter>
            <header className="shared-header-parent-box">
                <div className="nav-bar-parent-box">
                    <nav className={this.state.isTop ? "nav-bar-box" : " nav-bar-box scrolling-nav-bar2"}>

                        <div className="afi-name">
                        <Link className="link" to='/'><span className="AFI-title">AFI PAINT & SUPPLY</span></Link>
                        </div>

                        <div className="nav-bar-options">
                        {this.state.navActive ? (
                            <ul className="nav-dropdown-phone">
                                <span id="nav-menu-toggle" onClick={() => this.setState({ navActive: false })}>&#8801;</span>
                                <div className="list-items">
                                    <div className="list-items-box">
                                        <Link className="nav-bar-link link" to='/'><h4>HOME</h4></Link>
                                        <Link className="nav-bar-link link" to='/store'><h4>STORE</h4></Link>
                                        {this.userManagementTablet()}
                                        <Link className="nav-bar-link link" to='/cart'><h4>CART</h4></Link>
                                    </div>
                                </div>
                            </ul>) : (
                                <div>
                                <span id="nav-menu-toggle" onClick={() => this.setState({ navActive: true })}>&#8801;</span>
                                </div>
                        )}
                        </div>

                        <div className="list-items-min600">
                            <Link className="link rotate" to='/'><span>HOME</span></Link>
                            <Link className="link rotate" to='/store'><span>STORE</span></Link>
                            {this.userManagementDesktop()}
                            <Link className="link rotate" to='/cart'><span>CART</span></Link>
                        </div>
                    </nav>
                </div>
            </header>
            </HashRouter>
        );
    };
};

function mapStateToStore(reduxState) {
    return {
        user: reduxState.user
    }
}

export default connect(mapStateToStore, {getAccount})(Header);
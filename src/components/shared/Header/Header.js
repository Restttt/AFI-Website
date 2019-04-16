import React, {Component} from 'react';
import { HashRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux';

import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navActive: false,
            isTop: true,
            loggedIn: this.props.user.email
        };
    };

    componentDidMount() {
        document.addEventListener('scroll', () => {
          const isTop = window.scrollY < 100;
          if (isTop !== this.state.isTop) {
              this.setState({ isTop })
          }
        });
    }

    render() {
        return( 
            <HashRouter>
            <header className="shared-header-parent-box">
                <div className="nav-bar-parent-box">
                    <nav className={this.state.isTop ? "nav-bar-box" : " nav-bar-box scrolling-nav-bar2"}>

                        <div className="afi-name">
                        <Link className="link" to='/'><span>AFI PAINT & SUPPLY</span></Link>
                        </div>

                        <div className="nav-bar-options">
                        {this.state.navActive ? (
                            <ul className="nav-dropdown-phone">
                                <span id="nav-menu-toggle" onClick={() => this.setState({ navActive: false })}>&#8801;</span>
                                <div className="list-items">
                                    <div className="list-items-box">
                                        <Link className="link" to='/'><h4 className="link">HOME</h4></Link>
                                        <Link className="link" to='/store'><h4 className="link">STORE</h4></Link>
                                        {this.state.loggedIn === null ? (<Link className="link" to='/login'><h4 className="link">LOGIN</h4></Link>) : (<Link className="link" to='/account'><h4 className="link">ACCOUNT</h4></Link>)}
                                        <Link className="link" to='/cart'><h4 className="link">CART</h4></Link>
                                    </div>
                                </div>
                            </ul>) : (
                                <div>
                                <span id="nav-menu-toggle" onClick={() => this.setState({ navActive: true })}>&#8801;</span>
                                </div>
                        )}
                        </div>

                        <div className="list-items-min600">
                            <Link className="link" to='/'><span>HOME</span></Link>
                            <Link className="link" to='/store'><span>STORE</span></Link>
                            {this.state.loggedIn === null ? (<Link className="link" to='/login'>LOGIN</Link>) : (<Link className="link" to='/account'>ACCOUNT</Link>)}
                            <Link className="link" to='/cart'><span>CART</span></Link>
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

export default connect(mapStateToStore)(Header);
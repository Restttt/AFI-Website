import React, {Component} from 'react';
import { HashRouter, Link } from 'react-router-dom';

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
        document.addEventListener('scroll', () => {
          const isTop = window.scrollY < 350;
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
                    <nav className={this.state.isTop ? "nav-bar-box" : " nav-bar-box scrolling-nav-bar"}>

                        <div className="afi-name">
                        <Link className="link" to='/'><span>AFI PAINT & SUPPLY</span></Link>
                        </div>

                        <div className="nav-bar-options">
                        {this.state.navActive ? (
                            <ul className="nav-dropdown-phone">
                                <span id="nav-menu-toggle" onClick={() => this.setState({ navActive: false })}>&#8801;</span>
                                <div className="list-items">
                                    <div className="list-items-box">
                                        <Link className="link" to='/'><li>HOME</li></Link>
                                        <Link className="link" to='/store'><li>STORE</li></Link>
                                        <Link className="link" to='/login'><li>LOGIN</li></Link>
                                        <Link className="link" to='/cart'><li>CART</li></Link>
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
                            <Link className="link" to='/login'><span>LOGIN</span></Link>
                            <Link className="link" to='/cart'><span>CART</span></Link>
                        </div>
                    </nav>
                </div>
            </header>
            </HashRouter>
        );
    };
};

export default Header;
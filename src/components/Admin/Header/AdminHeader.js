import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './AdminHeader.scss';

class Header extends Component { 
    render() {
        return(
            <div className="admin-header">
                <Link to="/" className="link"><h1>Return To Main Website</h1></Link>
            </div>
        );
    };
};

export default Header;
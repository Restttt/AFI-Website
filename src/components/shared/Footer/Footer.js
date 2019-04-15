import React, {Component} from 'react';

import './Footer.scss'

class Footer extends Component {
    render() {
        return(
            <div>
                <footer>
                    <div className="footer-afi-info">
                        <p>Email: info@afipaintsupply.com</p>
                        <p>Number: (801) 990-7360</p>
                        <p>Address: 516 W Billinis Rd. South Salt Lake, Utah</p>
                    </div>
                </footer>
            </div>
        );
    };
};

export default Footer;
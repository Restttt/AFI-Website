import React, {Component} from 'react';

import Header from '../shared/Header/Header';
import './Store.scss';

class Store extends Component {
    render() {
        return(
            <div>
                <Header />
                <h1>Login</h1>
            </div>
        );
    };
};

export default Store;
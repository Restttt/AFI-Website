import React, {Component} from 'react';

import Header from '../shared/Header/Header';
import Footer from '../shared/Footer/Footer';
import Products from './Products/Products';
import './Store.scss';

class Store extends Component {  
    render() {
        return(
            <div>
                <Header />
                <div className="store-parent-container">
                    <div className="top-bar-store">
                        <div className="top-bar-container">
                            <h2>Welcome to the AFI Online Store</h2>
                            <h4>For delivery or broader selection of products, please call our store</h4>
                        </div>
                    </div>
                </div>
                <Products />
                <Footer />
            </div>
        );
    };
};


export default Store;
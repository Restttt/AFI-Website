import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Header from '../../../shared/Header/Header';
import Footer from '../../../shared/Footer/Footer';
import './Product.scss';

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {}
        };
    };

    componentDidMount() {
        let id = {
            id: this.props.match.params.id
        }
        axios.post('/api/store/product', id).then(res => {
            console.log(res.data);
            this.setState({ product: res.data });
        }).catch(err => alert('unable to pull product data'));
    };

    render() {
        console.log(this.props.match.params.id);
        return(
            <div>
                <Header />
                <div className="individual-parent">
                    <div className="individual-product-box">
                        <figure className="individual-image-box">
                            <img className="indivudal-image" src={this.state.product.p_image} alt="product"/>
                        </figure>
                        <span><h3>Product Name:</h3> {this.state.product.p_name}</span>
                        <span><h3>Price:</h3> <b>$</b>{this.state.product.price}</span>
                        <span><h3>Product Description:</h3>{this.state.product.p_description}</span>
                        <div className="individual-add-cart">
                            <input name="quantity" placeholder="Quantity" type="number" onChange={this.changeEvent} value={this.state.quantity} />
                            <button onClick={() => this.addToCart(this.props.match.params.id)}>Add To Cart</button>
                        </div>
                    </div>
                    <Link to="/store"><button className="back-button">Back</button></Link>
                </div>
    
                <Footer />
            </div>
        );
    };
};

export default Product;
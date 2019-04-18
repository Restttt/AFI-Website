import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

import Header from '../../../shared/Header/Header';
import Footer from '../../../shared/Footer/Footer';
import {addToCart} from '../../../../redux/ducks/shoppingReducer';
import './Product.scss';

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            quantity: 0
        };
    };

    componentDidMount() {
        let id = {
            id: this.props.match.params.id
        }
        axios.post('/api/store/product', id).then(res => {
            this.setState({ product: res.data });
        }).catch(err => alert('unable to pull product data'));
    };

    changeEvent = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    };

    addToCart = async (id) => {
        if (this.props.user.email === null) return alert('Please login to shop online');
        if (this.state.quantity < 1) {
            alert('Please add quantity');
        } else {
            let product = {
                id: this.props.match.params.id,
                name: this.state.product.p_name,
                quantity: this.state.quantity,
                price: this.state.product.price,
                image: this.state.product.p_image
            };
            await this.props.addToCart(product);
            const {history} = this.props;
            history.push('/cart');
        };
    };

    render() {
        return(
            <div>
                <Header />
                <div className="individual-parent">
                    <div className="product-display-container">
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
                </div>
    
                <Footer />
            </div>
        );
    };
};

function mapStateToRedux(reduxState) {
    return {
        user: reduxState.user,
        cart: reduxState.cart
    };
};

export default connect(mapStateToRedux, {addToCart})(Product);
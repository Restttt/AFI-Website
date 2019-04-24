import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteFromCart, getCart} from '../../redux/ducks/shoppingReducer';
import {Link} from 'react-router-dom';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Alert from 'react-s-alert';

import Header from '../shared/Header/Header';
import Checkout from './Checkout/Checkout';
import Footer from '../shared/Footer/Footer';
import './Cart.scss';

class Cart extends Component {

    deleteFromCart = async (index) => {
        let productIndex = {
            index
        }
        await this.props.deleteFromCart(productIndex)
        Alert.success('Deleted From Cart', {
            position: 'top-right',
            effect: 'genie',
            beep: false,
            timeout: 2000,
            offset: 100
        });
    };

    componentDidMount() {
        this.props.getCart();
        if (this.props.user.email === null) {
            this.props.history.push('/login');
        };
    };

    render() {
        const checkout = () => {
            return (
                <StripeProvider apiKey="pk_test_0rEUHBKrklmJpoOT90pdovC7006h4Rcv3X">
                    <div className="example">
                    <Elements>
                        <Checkout />
                    </Elements>
                    </div>
                </StripeProvider>
            )
        }
        const items = () => {
            if (this.props.cart.cart.length) {
                return this.props.cart.cart.map((product, index) => {
                    return(
                        <div className="cart-item-container" key={index}>
                        <Link to={`/products/${product.id}`}>
                            <figure className="cart-image-container">
                                <img className="cart-product-image" src={product.image} alt="product" />
                            </figure>
                        </Link>
                            <div className="cart-item-info-container">
                                <h5 className="product-info cart-name"> {product.name}</h5>
                                <h5 className="product-info cart-quantity">Quantity: {product.quantity}</h5>
                                <h5 className="product-info cart-price">Total Price: ${product.price * product.quantity}</h5>
                                <button onClick={() => this.deleteFromCart(index)}>Delete</button>
                            </div>
                        </div>
                    ) 
                })
            } else {
                return null;
            }
        }
        const getTotal = () => {
            return this.props.cart.cart.reduce((sum, current) => {
                return sum += (current.price * current.quantity)
            }, 0)
        }
        return(
            <div className="cart-entire-parent">
                <Header />
                <div className="cart-parent-container">
                    {this.props.cart.cart.length ? (
                        <div>
                            <h1 className="cart-title cart-title-border">YOUR CART</h1>
                            {/* <div className="cart-top-bar"> 
                                <h4>Name</h4>
                                <h4>Price</h4>
                                <h4>Quantity</h4>
                            </div> */}
                            {items()}
                            <h3 className="cart-total">Total: {getTotal()}</h3>
                            <div className="cart-buttons">
                                <Link to="/store"><button>Continue Shopping</button></Link>
                                {checkout()}
                            </div>
                        </div>
                    ) : (
                        <div className="cart-empty">
                            <h1>Your cart is empty</h1>
                            <Link to="/store"><button>Go To Store</button></Link>
                        </div>
                    )}
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

export default connect(mapStateToRedux, {deleteFromCart, getCart})(Cart);
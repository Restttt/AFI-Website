import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteFromCart, getCart} from '../../redux/ducks/shoppingReducer';
import {Link} from 'react-router-dom';

import Header from '../shared/Header/Header';
import Footer from '../shared/Footer/Footer';
import './Cart.scss';

// const items = this.props.cart.map(item => {
//     return(
//         <Link to={`/products/${item.productid}`}  key={item.productid}>
//             <h1>Hello</h1>
//         </Link>
//     )
// })
class Cart extends Component {
    deleteFromCart = async (index) => {
        let productIndex = {
            index
        }
        await this.props.deleteFromCart(productIndex)
    }
    componentDidMount() {
        this.props.getCart();
    }
    render() {
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
                                <Link to="/checkout"><button>Checkout</button></Link>
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
        cart: reduxState.cart
    };
};

export default connect(mapStateToRedux, {deleteFromCart, getCart})(Cart);
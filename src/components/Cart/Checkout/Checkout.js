import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
import Alert from 'react-s-alert';

import {emptyCart} from '../../../redux/ducks/shoppingReducer';

class Checkout extends React.Component {

    getTotal = () => {
        return this.props.cart.cart.reduce((sum, current) => {
            return sum += (current.price * current.quantity)
        }, 0)
    };

    emptyCart = async () => {
        console.log("hit emptyCart");
        await this.props.emptyCart();
        const { history } = this.props;
        history.push('/');
    };

    addOrder = (cart) => {
        console.log("hit addOrder")
        let order = {
            products: cart,
            userID: this.props.user.id,
            total: this.getTotal() * 100
        }
        console.log(order);
        axios.put('/checkout/addOrder', order).then(() => {
            this.emptyCart();
        }).catch(err => console.log(err));
    };

    updateInventory = () => {
        const cart = {
            products: this.props.cart.cart
        };
        axios.post('/checkout/updateInventory', cart).then(() => {
            this.addOrder(cart);
        }).catch(err => console.log(err));
    };

    onToken = (token) => {
        const data = {
            token,
            total: this.getTotal()
        }
        axios.post('/checkout/pay', data).then(() => {
            this.updateInventory();
            Alert.success('Your order has been placed!', {
                position: 'top-right',
                effect: 'genie',
                beep: false,
                timeout: 2000,
                offset: 100
            });;
        }).catch(err => console.log(err))
    };
    

    render() {
        console.log(this.props.cart, this.props.user);
        return (
            <StripeCheckout
            amount={this.getTotal() * 100}
            billingAddress
            description="Checkout"
            locale="auto"
            name="AFI PAINT & SUPPLIES"
            stripeKey="pk_test_0rEUHBKrklmJpoOT90pdovC7006h4Rcv3X"
            token={this.onToken}
            label="Pay with 💳"
        />
        );
    };
};


function mapStateToProps(reduxState) {
    return {
        cart: reduxState.cart,
        user: reduxState.user
    };
};

export default withRouter(connect(mapStateToProps, {emptyCart})(Checkout));
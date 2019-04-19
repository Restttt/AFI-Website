import React, {Component} from 'react';

class Products extends Component {
    constructor() {
        super();

        this.state = {
            display: false
        };
    };

    changeDisplay = () => {
        this.setState({ display: !this.state.display });
    }

    render() {
        const i = this.props.index
        const products = () => {
            if (this.props.orders) {
                return this.props.orders[i].products.map((product, index) => {
                    return(
                        <div className="order-products" key={index}>
                                <h3>{product}: {this.props.orders[i].quantities[index]} </h3>
                        </div>
                    )
                })
            } else {
                return null;
            }
        }
        const display = () => {
            if (!this.state.display) {
                return(
                    <p className="toggle-order-details" onClick={() => this.changeDisplay()}>Show Order Details</p>
                )
            } else {
                return(
                    <div>
                        <p className="toggle-order-details" onClick={() => this.changeDisplay()}>Hide Order Details</p>
                        <h3>Products:</h3>
                        {products()}
                    </div>
                )
            }
        }
        return (
            <div className="order-details-container">
                {display()}
            </div>
        );
    };
};

export default Products;
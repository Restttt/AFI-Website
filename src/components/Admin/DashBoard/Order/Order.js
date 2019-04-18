import React, {Component} from 'react';

class Order extends Component {
    constructor() {
        super();

        this.state = {
            display: false
        };
    };

    changeDisplay = () => {
        this.setState({ display: !this.state.display });
        console.log("hit");
    }

    render() {
        const i = this.props.index
        const products = () => {
            if (this.props.orders) {
                return this.props.orders[i].products.map((product, index) => {
                    console.log(this.props.orders[i])
                    return(
                        <div className="order-products">
                            {this.state.display ? (<div>
                                <h3>{product}: {this.props.orders[i].quantities[index]}</h3>
                                <p className="arrow2" onClick={() => this.changeDisplay()}>&#8593;</p>
                                </div>): (<div></div>)}
                        </div>
                    )
                })
            } else {
                return null;
            }
        }
        return (
            <div>
                {products(this.props.index)}
                <p className="arrow2" onClick={() => this.changeDisplay()}>&#x2193;</p>
            </div>
        );
    };
};

export default Order;
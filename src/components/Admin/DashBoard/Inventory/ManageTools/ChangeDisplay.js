import React, {Component} from 'react';
import axios from 'axios';

class ChangeDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
    };

    toggleDisplay = (product) => {
        axios.post('/admin/inventory/changeDisplay', product).then(res => {
            alert(`updated the product's display in store`);
        }).catch(err => alert('unable to update'));
    };

    getProductDisplay = () => {
        axios.get('/admin/inventory/productDisplay').then(res => {
            this.setState({ products: res.data })
        }).catch(err => alert('unable to pull the data'));
    };

    componentDidMount() {
        this.getProductDisplay();
    };

    render() {

        const products = () => {
           if (this.state.products) {
                return this.state.products.map((product, index) => {
                    return(
                    <div key={index} className="inventory-product-container">
                        <span className="inventory-product-box"><h5>{product.name}</h5> <h5>{product.display.toString()}</h5></span>
                    </div>
                )})
           } else {
               return null;
           };
        };

        return(
            <div>
                <span className="inventory-product-box check-inventory-title"><h3>Product Name</h3> <h3>Current Display</h3></span>
                {products()}
            </div>
        );
    };
};

export default ChangeDisplay;


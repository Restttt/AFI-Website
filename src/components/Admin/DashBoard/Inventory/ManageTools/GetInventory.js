import React, {Component} from 'react';
import axios from 'axios';

class GetInventory extends Component {
    constructor() {
        super();

        this.state = {
            products: [],
            search: ''
        }
    }
    componentDidMount() {
        axios.get('/admin/getInventory').then(res =>{
            this.setState({ products: res.data })
        }).catch(err => console.log(err));
    };

    filterSearch = () => {
        let productsCopy = this.state.products;
        let keyWord = this.state.search;
        if (keyWord) {
            return productsCopy.filter(product => product.name.toLowerCase().includes(keyWord.toLowerCase()))
        } else {
            return productsCopy
        }
    };

    render() {
        const product = () => {
            if (this.state.products.length) {
                return this.filterSearch().map((product, index) => {
                    return(<div key={index} className="inventory-product-container">
                        <span className="inventory-product-box"><h5>{product.name}</h5> <h5>{product.inventory}</h5></span>
                    </div>
                )})
            }
        }
        return(
            <div>
                <input className="inventory-search" name="product" placeHolder="Search Product By Name" onChange={(e) => this.setState({ search: e.target.value})}/>
                <span className="inventory-product-box check-inventory-title"><h3>Product Name</h3> <h3>Stock</h3></span>
                {product()}
            </div>
        );
    };
};

export default GetInventory;
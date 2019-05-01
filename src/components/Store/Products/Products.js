import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllProducts, getByCategory} from '../../../redux/ducks/storeReducer';
import {Link} from 'react-router-dom';

import './Products.scss';

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: 'All'
        } 
    }
    componentDidMount() {
        this.props.getAllProducts();
    }

    changeCategory = (e) => {
        const {value} = e.target;
        if (value !== this.state.category) {
            this.setState({ category: value });
            if (value === "All") {
                this.props.getAllProducts();
            } else {
                let category = value;
                category = category.toLowerCase();
                category = {
                    category: category
                };
                this.props.getByCategory(category);
            };
        };
    };

    render() {
        const products = this.props.store.products.map(product => {
            return(
                <Link to={`/products/${product.productid}`} className="link" key={product.productid}>
                <div className="product-container l">
                    <figure className="product-image-box l">
                        <img className="product-image l" src={product.p_image} alt="product" />
                    </figure>
                    <h3 className="product-info product-name">{product.p_name}</h3>
                    <h3 className="product-info product-price">${product.price}</h3>
                </div></Link>
            )
        })
        return this.props.store.products ? (
            <div className="products-parent-container">
                <div className="products-search">
                    <h3>Search By Category</h3>
                    <select name="Category" onChange={this.changeCategory}>
                        <option value="All">All</option>
                        <option value="Paint">Paint</option>
                        <option value="Tools">Tools</option>
                        <option value="Mask">Mask</option>
                    </select>
                </div>
                {products}
            </div>
        ) : (
            <div>Loading Store</div>
        )
    };
};

function mapProductsToState(reduxState) {
    return {
        store: reduxState.store,
        user: reduxState.user
    };
};

export default connect(mapProductsToState, {getAllProducts, getByCategory})(Products);
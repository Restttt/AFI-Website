import React, {Component} from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';
import swal from 'sweetalert';

class GetInventory extends Component {
    constructor() {
        super();

        this.state = {
            products: [],
            search: ''
        }
    }

    getInventory = () => {
        axios.get('/admin/getInventory').then(res =>{
            this.setState({ products: res.data })
        }).catch(() => {
            Alert.error('Unable To Pull The Data', {
            position: 'top-right',
            effect: 'genie',
            beep: false,
            timeout: 2000,
            offset: 100
            }
        )}
    )};
    componentDidMount() {
        this.getInventory();
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

    updateInventory = async (product) => {
        let inventory = await swal({
            text: `Please input the total ${product} you have in inventory`,
            content: "input",
        }).then(res => {
            return res
        });
        axios.post('/admin/changeInventory', {product, inventory}).then(() => {
            this.getInventory();
            Alert.success(`Changed Inventory for ${product} to ${inventory}`, {
                position: 'top-right',
                effect: 'genie',
                beep: false,
                timeout: 5000,
                offset: 100
            });
        }).then(err => console.log(err));
    };

    render() {
        const product = () => {
            if (this.state.products.length) {
                return this.filterSearch().map((product, index) => {
                    return(<div key={index} className="inventory-product-container">
                        <span className="inventory-product-box"><h5>{product.name}</h5> <h5 onClick={() => this.updateInventory(product.name)}>{product.inventory}</h5></span>
                    </div>
                )})
            } else {
                return null;
            }
        }
        return(
            <div className="inventory-product-display">
                <input className="inventory-search" name="product" placeholder="Search Product By Name" onChange={(e) => this.setState({ search: e.target.value})}/>
                <span className="inventory-product-box check-inventory-title"><h3>Product Name</h3> <h3>Stock</h3></span>
                {product()}
            </div>
        );
    };
};

export default GetInventory;
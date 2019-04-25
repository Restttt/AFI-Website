import React, {Component} from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';
import swal from 'sweetalert';


class ChangeDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            search: ''
        };
    };

    toggleDisplay = async (product, display) => {
        let answer = await swal({
            text: `Type yes to confirm you want to change display for ${product}`,
            content: "input",
        }).then(res => {
            return res
        });
        if (answer && answer.toLowerCase() === 'yes') {
            let item = {
                name: product,
                display: !display
            };
            axios.post('/admin/inventory/changeDisplay', item).then(res => {
                this.setState({ products: res.data });
            }).catch(() => 
                    Alert.error('Unable To Change Display', {
                    position: 'top-right',
                    effect: 'genie',
                    beep: false,
                    timeout: 2000,
                    offset: 100
                }
            ));
        } else {
            return;
        };
    };

    getProductDisplay = () => {
        axios.get('/admin/inventory/productDisplay').then(res => {
            this.setState({ products: res.data })
        }).catch(() => 
            Alert.error('Unable To Pull The Data', {
            position: 'top-right',
            effect: 'genie',
            beep: false,
            timeout: 2000,
            offset: 100
            }
        ));
    };

    componentDidMount() {
        this.getProductDisplay();
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

        const products = () => {
           if (this.state.products) {
                return this.filterSearch().map((product, index) => {
                    return(
                    <div key={index} className="inventory-product-container">
                        <span className="inventory-product-box"><h5>{product.name}</h5> <h5 onClick={() => this.toggleDisplay(product.name, product.display)}>{product.display.toString()}</h5></span>
                    </div>
                )})
           } else {
               return null;
           };
        };

        return(
            <div className="inventory-product-display">
                <input className="inventory-search" name="product" placeholder="Search Product By Name" onChange={(e) => this.setState({ search: e.target.value})}/>
                <span className="inventory-product-box check-inventory-title"><h3>Product Name</h3> <h3>Current Display</h3></span>
                {products()}
            </div>
        );
    };
};

export default ChangeDisplay;


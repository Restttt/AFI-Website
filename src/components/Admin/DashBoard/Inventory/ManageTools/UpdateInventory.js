import React, {Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

class UpdateInventory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            product: '',
            inventory: 0
        }
    }
    getAllProductNames = () => {
        axios.get('/admin/chart/getProductNames').then(res => {
            this.setState({ products: res.data });
        }).catch(err => console.log(err));
    };

    componentDidMount() {
        this.getAllProductNames();
    };

    updateInventory = () => {
        let product = {
            name: this.state.product,
            inventory: this.state.inventory
        }
        axios.post('/admin/updateInventory', product).then(res => {
            alert('successfully updated');
        }).then(err => console.log('err'));
    };

    render() {
        return(
            <div>
                <Select
                value={this.state.one}
                onChange={(e) => {
                    this.setState({ product: e.value })
                }}
                placeholder={this.state.one}
                options={this.state.products}
                />
                <input type="number" value={this.state.inventory} onChange={(e) => this.setState({ inventory: e.target.value })}/>
                <button onClick={() => this.updateInventory()}>Submit</button>
            </div>
        );
    };
};

export default UpdateInventory;
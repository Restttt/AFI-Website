import React, {Component} from 'react';

class AddItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            image: '',
            name: '',
            category: '',
            price: '',
            stock: '',
            description: '',
        };
    };

    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    };

    render() {
        return(
            <div>
                <input value={this.state.name} placeholder="Product Name" name="name" onChange={this.handleChange}/>
                <input value={this.state.category} placeholder="Category" name="name" onChange={this.handleChange}/>
                <input value={this.state.price} placeholder="Price" name="name" type="text" onChange={this.handleChange}/>
                <select onChange={(e) => this.setState({ description: e.target.value})}>
                    <option value="car care">Car Care</option>
                    <option value="tools">Tools</option>
                    <option value="paint">Paint</option>
                    <option value="mask">Mask</option>
                </select>
                <input value={this.state.stock} placeholder="Inventory" name="name" onChange={this.handleChange}/>
                <input value={this.state.stock} placeholder="Description" name="name" onChange={this.handleChange}/>
                <button>Add To Store</button>
            </div>
        );
    };
};

export default AddItem;
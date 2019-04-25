import React, {Component} from 'react';

import './Inventory.scss';
import AddItem from './ManageTools/AddItem';
import GetInventory from './ManageTools/GetInventory';
import ChangeDisplay from './ManageTools/ChangeDisplay';

class Inventory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: 'add'
        } 
    }

    render() {
        const displayMode = () => {
            if (this.state.display === 'add') {
                return(
                    <AddItem />
                );
            } else if (this.state.display === "inventory") {
                return(
                    <GetInventory />
                );
            } else if (this.state.display === "store") {
                return(
                    <ChangeDisplay />
                )
            } else {
                return null;
            };
        };
        return(
            <div>
                <div className="chartContainer-header">
                    <h4 onClick={() => this.setState({ display: 'add' })}>Add Product</h4> 
                    <h4 onClick={() => this.setState({ display: 'inventory' })}>Change Inventory</h4>
                    <h4 onClick={() => this.setState({ display: 'store' })}>Change Store Display</h4>
                </div>
                <div className="inventory-display-container">
                    {displayMode()}
                </div>
            </div>
        );
    };
};

export default Inventory;
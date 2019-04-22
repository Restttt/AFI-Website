import React, {Component} from 'react';

import './ChartContainer.scss'
import FiveProducts from './ChartDataType/FiveProducts';
import TopCustomers from './ChartDataType/TopCustomers';
import TopProducts from './ChartDataType/TopProducts';

class ChartContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartToDisplay: 'topProducts',
        };
    };

    render() {
        const displayChart = () => {
            if (this.state.chartToDisplay === 'fiveProducts') {
                return(
                    <FiveProducts />
                );
            } else if (this.state.chartToDisplay === 'topCustomers') {
                return(
                    <TopCustomers />
                );
            } else if (this.state.chartToDisplay === 'topProducts') {
                return(
                    <TopProducts />
                );
            } else {
                return null;
            }
        }
        return(
            <div>
                <div className="chartContainer-header">
                    <h4 onClick={() => this.setState({ chartToDisplay: 'topProducts'})}>Top 5 Products</h4> 
                    <h4 onClick={() => this.setState({ chartToDisplay: 'fiveProducts'})}>Custom 5 Products</h4>  
                    <h4 onClick={() => this.setState({ chartToDisplay: 'topCustomers'})}>Top Customers</h4>
                </div>
                {displayChart()}
            </div>
        );
    };
};

export default ChartContainer
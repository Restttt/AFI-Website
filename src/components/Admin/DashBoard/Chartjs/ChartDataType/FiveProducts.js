import React, {Component} from 'react';
import Select from 'react-select'
import axios from 'axios';
import {connect} from 'react-redux';

import {get5Products} from '../../../../../redux/ducks/chartReducer';
import makeChart from '../ChartCreator/Chart';
import ChartType from './changeChartType';

class FiveProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectingProducts: true,
            one: '',
            two: '',
            three: '',
            four: '',
            five: '',
            products: []
        };
    };

    getAllProductNames = () => {
        axios.get('/admin/chart/getProductNames').then(res => {
            this.setState({ products: res.data });
        }).catch(err => console.log(err));
    };

    componentDidMount() {
        this.getAllProductNames();
    }

    submitProducts = async () => {
        const products = {
            one: this.state.one,
            two: this.state.two,
            three: this.state.three,
            four: this.state.four,
            five: this.state.five
        }
        await this.props.get5Products(products);
        this.setState({ selectingProducts: false });
    }

    render() {
        const chartType = this.props.chart.chartType;
        const chartData = this.props.chart.chartData;
        const chartTitle = this.props.chart.chartTitle;
        const dataLabels = this.props.chart.dataLabels;
        const changeProducts = () => {
            if (this.state.selectingProducts) {
                return(
                    <div className="5-product-search-fields">

                        <span> Product 1: <Select
                        value={this.state.one}
                        onChange={(e) => {
                            this.setState({ one: e.value })
                        }}
                        placeholder={this.state.one}
                        options={this.state.products}
                        /> </span>

                        <span> Product 2: <Select
                        value={this.state.two}
                        onChange={(e) => {
                            this.setState({ two: e.value })
                        }}
                        placeholder={this.state.two}
                        options={this.state.products}
                        /> </span>

                        <span> Product 3: <Select
                        value={this.state.three}
                        onChange={(e) => {
                            this.setState({ three: e.value })
                        }}
                        placeholder={this.state.three}
                        options={this.state.products}
                        /> </span>

                        <span> Product 4: <Select
                        value={this.state.four}
                        onChange={(e) => {
                            this.setState({ four: e.value })
                        }}
                        placeholder={this.state.four}
                        options={this.state.products}
                        /> </span>

                        <span> Product 5: <Select
                        value={this.state.five}
                        onChange={(e) => {
                            this.setState({ five: e.value })
                        }}
                        placeholder={this.state.five}
                        options={this.state.products}
                        /> </span>

                        <button onClick={() => this.submitProducts()}>Submit</button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <ChartType />
                        {makeChart(chartType, chartData, chartTitle, dataLabels)}
                    </div>
                )
            }
        }
        return (
            <div className="search-5-container">
                {changeProducts()}
            </div>
        ); 
    };
};

function mapStateToProps(reduxState) {
    return{
        chart: reduxState.chart
    };
};

export default connect(mapStateToProps, {get5Products})(FiveProducts);
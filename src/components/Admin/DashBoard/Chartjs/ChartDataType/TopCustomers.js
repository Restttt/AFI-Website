import React, {Component} from 'react';

import {connect} from 'react-redux';
import {topCustomers} from '../../../../../redux/ducks/chartReducer';
import makeChart from '../ChartCreator/Chart';
import ChartType from './changeChartType';

class TopCustomer extends Component {
    componentDidMount() {
        this.props.topCustomers();
    }
    render() {
        const chartType = this.props.chart.chartType;
        const chartData = this.props.chart.chartData;
        const chartTitle = this.props.chart.chartTitle;
        const dataLabels = this.props.chart.dataLabels;
        return this.props.chart ? (
            <div>
                <ChartType />
                {makeChart(chartType, chartData, chartTitle, dataLabels)}
            </div>
            ) : (
            <div>
            </div>
        );
    };
};

function mapStateToProps(reduxState) {
    return{
        chart: reduxState.chart
    };
};

export default connect(mapStateToProps, {topCustomers})(TopCustomer);
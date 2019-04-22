import React, {Component} from 'react';
import {connect} from 'react-redux';
import {topProducts} from '../../../../../redux/ducks/chartReducer';

import makeChart from '../ChartCreator/Chart';
import ChartType from './changeChartType';

class TopProducts extends Component {
    componentDidMount() {
        this.props.topProducts()
    }
    render() {
        const chartType = this.props.chart.chartType;
        const chartData = this.props.chart.chartData;
        const chartTitle = this.props.chart.chartTitle;
        const dataLabels = this.props.chart.dataLabels;
        return(
            <div>
                <ChartType />
                {this.props.chart ? (makeChart(chartType, chartData, chartTitle, dataLabels)) : (<div></div>)}
            </div>
        );
    };
};

function mapStateToProps(reduxState) {
    return {
        chart: reduxState.chart
    }
}

export default connect(mapStateToProps, {topProducts})(TopProducts);
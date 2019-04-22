import React, {Component} from 'react';
import {connect} from 'react-redux';

import {changeChartType} from '../../../../../redux/ducks/chartReducer';

class ChangeChartType extends Component { 
    render() {
        return(
            <div className="change-chart-type-container">
                <select onChange={(e) => this.props.changeChartType(e.target.value)}>
                    <option value="pie">Pie</option>
                    <option value="bar">Bar</option>
                    <option value="doughnut">Doughnut</option>
                </select>
            </div>
        );
    };
};

function mapStateToProps(reduxState) {
    return{
        chart: reduxState.chart
    };
};

export default connect(mapStateToProps, {changeChartType})(ChangeChartType);
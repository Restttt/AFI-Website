import axios from 'axios'

const initialState = {
    chartType: 'pie',
    chartData: [],
    chartTitle: 'AFI PAINT',
    dataLabels: []
}

const UPDATE_CHART = "UPDATE_CHART";
const UPDATE_CHART_TYPE = "UPDATE_CHART_TYPE";


// REDUCER FUNCTIONS //
export function topProducts() {
    const chartData = axios.get('/admin/chart/top5Products').then(res => {
        return res.data;
    });
    return {
        type: UPDATE_CHART,
        payload: chartData
    }
}

export function topCustomers() {
    const chartData = axios.get('/admin/chart/top5Customers').then(res => {
        return res.data;
    });
    return {
        type: UPDATE_CHART,
        payload: chartData
    }
}

export function get5Products(products) {
    const chartData = axios.post('/admin/chart/5Products', products).then(res => {
        return res.data;
    });
    return {
        type: UPDATE_CHART,
        payload: chartData
    }
}

export function changeChartType(type) {
    return {
        type: UPDATE_CHART_TYPE,
        payload: type
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_CHART + "_FULFILLED": {
            return {...state, chartData: action.payload[0], dataLabels: action.payload[1]}
        }
        case UPDATE_CHART_TYPE: {
            return {...state, chartType: action.payload}
        }
        default: {
            return {...state};
        }
    };
};
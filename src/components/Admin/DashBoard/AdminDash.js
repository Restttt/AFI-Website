import React, {Component} from 'react';
import axios from 'axios';

import './AdminDash.scss';
import Header from '../Header/AdminHeader';
import makeChart from './Chartjs/Chart';
import Order from './Order/Order';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            orders: [],
            chartType: 'line',
            chartData: {
                labels: ['Boston', 'Worcester', 'Springfield', 'Lowell'],
                datasets: [
                    {
                        label:'Population',
                        data: [
                            616753,
                            314134,
                            123462,
                            13140
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            },
        }
    }

    getAllOrders() {
        axios.get('/admin/getOrders').then(res => {
            this.setState({ orders: res.data })
        }).catch(() => alert('unable to pull all orders at this time'));
    };
    
    componentDidMount() {
        this.getAllOrders();
    }

    render() {
        const orders = () => {
            if (this.state.orders.length) {
                return this.state.orders.map((order, index) => {
                    return(
                        <div className="order-information"key={order.orderID}>
                            <h3>{order.orderid}</h3>
                            <h3>{order.name}</h3>
                            <h3>{order.total}</h3>
                            <Order 
                            index={index}
                            orders={this.state.orders}/>

                        </div>
                    );
                });
            } else {
                return null;
            }
        }
        console.log(this.state.orders);
        return(
            <div>
                <Header />
                <h5 className="device-to-small">*Please access this website on a computer for full admin functionality</h5>
                <div className="chart-container">
                    {makeChart(this.state.chartType, this.state.chartData)}
                </div>
                <div className="orders-container">
                    {orders()}
                </div>
            </div>
        );
    };
};

export default Dashboard;
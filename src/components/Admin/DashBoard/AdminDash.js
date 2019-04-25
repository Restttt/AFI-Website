import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Alert from 'react-s-alert';


import './AdminDash.scss';
import Header from '../Header/AdminHeader';
import Products from './Order/Products';
import ChartContainer from './Chartjs/ChartContainer'
import Inventory from './Inventory/Inventory';
import Footer from '../../shared/Footer/Footer';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            search: '',
            orders: [],
        };
    };

    getAllOrders() {
        axios.get('/admin/getOrders').then(res => {
            this.setState({ orders: res.data })
        }).catch(() => 
            Alert.error('Unable To Pull Orders', {
            position: 'top-right',
            effect: 'genie',
            beep: false,
            timeout: 2000,
            offset: 100
            }
        ));
    };
    
    componentDidMount() {
        this.getAllOrders();

        if (!this.props.user.admin) {
            Alert.error('You do not have permission to access admin pages', {
                position: 'top-right',
                effect: 'genie',
                beep: false,
                timeout: 4000,
                offset: 100
            });
            this.props.history.push('/');
        };
    };

    filterSearch = () => {
        let orderCopy = this.state.orders;
        let keyWord = this.state.search;
        if (keyWord) {
            orderCopy = orderCopy.filter(order => {
                return (order.orderid === +keyWord || order.name.toLowerCase().includes(keyWord.toLowerCase()))
            })
            return orderCopy;
        } else {
            return orderCopy
        }
    };

    render() {
        const orders = () => {
            if (this.state.orders.length) {
                return this.filterSearch().map((order, index) => {
                    return(
                        <div className="order-information" key={index}>
                            <div className="order-key-information">
                                <h3>ORDER ID: {order.orderid}</h3>
                                <h3>Company: {order.name}</h3>
                                <h3>TOTAL: ${order.total}</h3>
                            </div>
                            <Products 
                            index={index}
                            orders={this.state.orders}/>

                        </div>
                    );
                });
            } else {
                return null;
            };
        };
        return(
            <div>
                <Header />
                <h5 className="device-to-small">*Please go on a desktop with a min-width of 980px for more admin functionality</h5>
                <div className="admin-dashboard-container">
                    <div className="orders-container">
                        <span>
                            <h2>Orders</h2>  
                            <input name="search" onChange={(e) => this.setState({ search: e.target.value})}className="admin-search-orders" placeholder='search by company or orderID'/>
                        </span>
                        {orders()}
                    </div>
                    <div className="right-side-admin-container">
                        <div className="chart-container">
                            <ChartContainer />
                        </div>
                        <div className="inventory-container">
                            <Inventory />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    };
};

function mapStateToProps(reduxState) {
    return {
        user: reduxState.user
    };
};

export default connect(mapStateToProps)(Dashboard);
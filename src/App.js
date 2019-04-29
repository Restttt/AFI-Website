import React, { Component } from 'react';
import {HashRouter, Switch, Route}from 'react-router-dom'
import './App.scss';

// COMPONENTS //
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Cart from './components/Cart/Cart';
import Store from './components/Store/Store';
import Register from './components/Login/Register/Register';
import Product from './components/Store/Products/Product/Product';
import Account from './components/Account/Account';
import Dashboard from './components/Admin/DashBoard/AdminDash';

// REACT-S-ALERT //
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

// MATERIAL //
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue, orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange
  },
  typography: {
    useNextVariants: true,
  },
});

// APP //
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <HashRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/cart" component={Cart} />
          <Route path="/store" component={Store} />
          <Route path="/register" component={Register} />
          <Route path="/products/:id" component={Product} />
          <Route path="/account" component={Account} />
          <Route path="/admin/dashboard" component={Dashboard} />
        </Switch>
        <Alert stack={{limit: 3}} />
      </div>
      </HashRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;

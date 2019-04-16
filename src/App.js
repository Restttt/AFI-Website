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


// APP //
class App extends Component {
  render() {
    return (
      <HashRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/cart" component={Cart} />
          <Route path="/store" component={Store} />
          <Route path="/register" component={Register} />
          <Route path="/products/:id" component={Product} />
        </Switch>
      </div>
      </HashRouter>
    );
  }
}

export default App;

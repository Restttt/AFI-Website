import React, { Component } from 'react';
import {HashRouter, Switch, Route}from 'react-router-dom'
import './App.scss';

// COMPONENTS //
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Cart from './components/Cart/Cart';
import Store from './components/Store/Store';


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
        </Switch>
      </div>
      </HashRouter>
    );
  }
}

export default App;

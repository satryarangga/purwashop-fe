import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Product from './components/product';
import Register from './components/register';
import Cart from './components/cart';
import Checkout from './components/checkout';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/barang/:author/:title" component={Product} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;


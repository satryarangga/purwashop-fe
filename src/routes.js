import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Product from './components/product';
import Register from './components/register';
import Cart from './components/cart';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/barang/:author/:title" component={Product} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;


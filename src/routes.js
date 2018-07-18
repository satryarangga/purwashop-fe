import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Product from './components/product';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/barang" component={Product} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;


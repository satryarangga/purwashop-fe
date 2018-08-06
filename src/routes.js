import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Product from './components/product';
import Register from './components/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/barang/:author/:title" component={Product} />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;


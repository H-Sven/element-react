import React from 'react';
import Goods from '../pages/Goods/index';
import Ratings from '../pages/Ratings';
import Seller from '../pages/Seller';
import {Route, Switch} from 'react-router-dom';

const RouterConfig = [
  {
    path: '/',
    exact: true,
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/seller',
    component: Seller
  }
]
const AppRouters = () => (
  <div className="container">
    <Switch>
      {RouterConfig.map((route,index)=>
        <Route
          key={index}
          component={route.component}
          path={route.path}
          exact={route.exact}
        ></Route>
      )}
    </Switch>
  </div>
)
export default AppRouters;
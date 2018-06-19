import React from 'react';
import Goods from '../pages/Goods/index';
import Ratings from '../pages/Ratings';
import Seller from '../pages/Seller';
import {Route, Switch} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
    <Route render={({location})=>(
      <TransitionGroup component="main" >
        <CSSTransition 
          key={location.pathname}
          transitionName="fade" 
          timeout={300}>
          <Switch location={location}>
            {RouterConfig.map((route,index)=>
              <Route
                key={index}
                component={route.component}
                path={route.path}
                exact={route.exact}
              ></Route>
            )}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )}>
    </Route>
  </div>
)
export default AppRouters;
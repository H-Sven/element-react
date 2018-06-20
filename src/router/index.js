import React from 'react';
import RouterAnimation from './RouterAnimation';
import Goods from '../pages/Goods/index';
import Ratings from '../pages/Ratings';
import Seller from '../pages/Seller';
import {Route, Switch, withRouter} from 'react-router-dom';

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
const pathWeight = {
  '/': 0,
  '/ratings': 1,
  '/seller': 2
}
let preHref = null;
const AppRouters = props => {
  return <div className="container">
    <Route render={({location})=>{
      
      let classNames = 'right-sild';
      if(preHref && pathWeight[location.pathname] < pathWeight[preHref]) classNames = 'left-sild';
      preHref = location.pathname;
      return(
        <RouterAnimation
          animationKey={location.pathname}
          classNames={classNames} 
          timeout={500}
        >
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
        </RouterAnimation>    
      )
    }}>
    </Route>
  </div>
}
export default withRouter(AppRouters);
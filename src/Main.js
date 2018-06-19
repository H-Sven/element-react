import React,{Component} from 'react';
import {Provider} from 'react-redux'
import store from './stores';
import {setSeller} from './stores/seller/actions';
import {initGoods} from './stores/goods/actions';
import {setRatings} from './stores/ratings/actions';
import AppRouters from './router';
import Header from './components/Header'
import {
  BrowserRouter as Router,
  NavLink
} from 'react-router-dom';


class App extends Component {
  constructor(){
    super();
    const allData = ()=>import('./stores/data.json');
    allData().then(res=>{
      res.goods.forEach(good => {
        good.foods.forEach(food=>food.count = 0);
      });
      store.dispatch(setSeller(res.seller));
      store.dispatch(setRatings(res.ratings));
      store.dispatch(initGoods(res.goods));
    });
  }
  render() {
    // this.propsxx
    return (
      <Provider store={store}>
        <div className="app-warp">
          <Header/>
          <Router>
            <div>
                <ul className="tab border-1px">
                  <li className="tab-item"><NavLink exact to="/">商品</NavLink></li>
                  <li className="tab-item"><NavLink to="/ratings">评论</NavLink></li>
                  <li className="tab-item"><NavLink to="/seller">商家</NavLink></li>
                </ul>
                <AppRouters></AppRouters>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

App.defaultProps = {
};

export default App;
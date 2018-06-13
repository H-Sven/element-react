import goods from './goods/reducers';
import seller from './seller/reducers';
import ratings from './ratings/reducers';
import shoppingCart from './shoppingCart/reducers';
import {combineReducers, createStore} from 'redux';

const reducers = combineReducers({
  goods,
  seller,
  ratings,
  shoppingCart
});
const initState = {
  seller: null,
  ratings: null,
  goods: null,
  shoppingCart: []
};
export default  createStore(reducers, initState);

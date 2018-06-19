import * as actions from '../constants/actionType';
import {deepClone} from '@/sources/utils';
let initialState = null;
const todosObj = {}
todosObj[actions.INIT_GOODS] = (state, action)=>{
  initialState = deepClone(action.goods);
  return action.goods
};
todosObj[actions.SET_GOODS] = (state, action)=>action.goods;
todosObj[actions.SET_FOOD_COUNT] = ([...goods], action)=>{
  goods[action.path[0]].foods[action.path[1]].count  =  action.count;
  return goods;
};

todosObj[actions.EMPTY_CHOICE] = ()=>deepClone(initialState);

export default function todos(state = null, action){
  return todosObj[action.type] ? todosObj[action.type](state, action) : state;
}
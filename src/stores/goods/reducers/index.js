import * as actions from '../constants/actionType';
import {deepClone} from '@/sources/utils';
const initialState = []
const todosObj = {}
todosObj[actions.SET_GOODS] = (state, action)=>action.goods;
todosObj[actions.SET_FOOD_COUNT] = (state, action)=>{
  action.food.count = action.count;
  return deepClone(state);
};

export default function todos(state = initialState, action){
  return todosObj[action.type] ? todosObj[action.type](state, action) : state;
}
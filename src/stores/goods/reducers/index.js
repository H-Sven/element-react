import * as actions from '../constants/actionType';
const initialState = []
const todosObj = {}
todosObj[actions.SET_GOODS] = (state, action)=>action.goods;
todosObj[actions.SET_FOOD_COUNT] = (goods, action)=>{
  goods[action.path[0]].foods[action.path[1]].count  =  action.count;
  return [...goods];
};

export default function todos(state = initialState, action){
  return todosObj[action.type] ? todosObj[action.type](state, action) : state;
}
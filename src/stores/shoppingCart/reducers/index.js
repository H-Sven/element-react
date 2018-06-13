import * as actions from '../constants/actionType';

const initialState = []
const todosObj = {}
todosObj[actions.SET_FOOD_COUNT] = (state, action)=>{
  if(state.indexOf(action.food) === -1) state.push(action.food);
  return [...state];
};

export default function todos(state = initialState, action){
  return todosObj[action.type] ? todosObj[action.type](state, action) : state;
}
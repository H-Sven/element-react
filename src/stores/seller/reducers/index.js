import * as actions from '../constants/actionType';

const initialState = {}
const todosObj = {}
todosObj[actions.SET_SELLER] = (state, action)=>action.seller;

export default function todos(state = initialState, action){
  return todosObj[action.type] ? todosObj[action.type](state, action) : state;
}
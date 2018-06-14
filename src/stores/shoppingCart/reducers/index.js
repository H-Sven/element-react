import * as actions from '../constants/actionType';

const initialState = []
const todosObj = {}
todosObj[actions.ADD_CART] = (state, action)=>{
  const path = action.path.join('/');
  if(action.count === 0) {
    state.splice(state.indexOf(path),1);
  } else {
    state.push(path);
  }
  return state;
};

export default function todos(state = initialState, action){
  return todosObj[action.type] ? todosObj[action.type](state, action) : state;
}
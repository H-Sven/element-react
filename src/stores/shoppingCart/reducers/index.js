import * as actions from '../constants/actionType';

const todosObj = {}

todosObj[actions.ADD_CART] = (state, action)=>{
  const path = action.path.join('/');
  if(action.remove === 0) {
    state.splice(state.indexOf(path),1);
  } else {
    state.push(path);
  }
  console.log(state);
  return state;
};

todosObj[actions.EMPTY_CART] = ()=>[];
export default function todos(state = [], action){
  return todosObj[action.type] ? todosObj[action.type](state, action) : state;
}
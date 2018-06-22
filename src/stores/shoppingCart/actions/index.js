import * as types from '../constants/actionType';

export const addCart = (path,remove)=>({type: types.ADD_CART, path, remove});
export const emptyCart = ()=>({type: types.EMPTY_CART});
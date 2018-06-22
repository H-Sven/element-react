import * as types from '../constants/actionType';

export const initGoods = goods=>({type: types.INIT_GOODS, goods});
export const setGoods = goods=>({type: types.SET_GOODS, goods});
export const setFoodCount = (path,count)=>({type: types.SET_FOOD_COUNT, path, count});
export const emptyChoice = ()=>({type: types.EMPTY_CHOICE});
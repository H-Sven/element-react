import * as types from '../constants/actionType';

export const setGoods = goods=>({type: types.SET_GOODS, goods});
export const setFoodCount = (food,count)=>({type: types.SET_FOOD_COUNT, food, count});
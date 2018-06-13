import * as types from '../constants/actionType';

export const setFoodCount = (food,count)=>({type: types.SET_FOOD_COUNT, food, count});
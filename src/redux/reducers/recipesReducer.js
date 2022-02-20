import {
  GET_RECIPES_FAILURE,
  GET_RECIPES_REQUEST,
  GET_RECIPES_SUCCESS,
} from "../types/recipesType";

export const recipesState = {
  loadingRecipes: false,
  dataRecipes: null,
  errRecipes: null,
};

export const recipesReducer = (state = recipesState, action) => {
  switch (action.type) {
    case GET_RECIPES_REQUEST:
      console.log(action);
      return {
        ...state,
        loadingRecipes: false,
        errRecipes: null,
      };
    case GET_RECIPES_SUCCESS:
      console.log(action);
      return {
        ...state,
        loadingRecipes: false,
        dataRecipes: action.data,
        errRecipes: null,
      };
    case GET_RECIPES_FAILURE:
      console.log(action);
      return {
        ...state,
        loadingRecipes: false,
        dataRecipes: null,
        errRecipes: action.err,
      };

    default:
      return state;
  }
};

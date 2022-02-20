import { GET_RECIPES_REQUEST } from "../types/recipesType";

export const getRecipesAction = (params) => ({
  type: GET_RECIPES_REQUEST,
  params,
});

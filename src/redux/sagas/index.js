import { takeLatest, all } from "redux-saga/effects";
import { GET_RECIPES_REQUEST } from "../types/recipesType";
import { getRecipesSaga } from "./recipesSaga";

export function* rootSaga() {
  yield all([takeLatest(GET_RECIPES_REQUEST, getRecipesSaga)]);
}

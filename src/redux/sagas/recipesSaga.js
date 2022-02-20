import { put, call } from "redux-saga/effects";
import { GET_RECIPES_FAILURE, GET_RECIPES_SUCCESS } from "../types/recipesType";
import { getRecipesApi } from "../services/recipeApi";

export function* getRecipesSaga(action) {
  const { ok, err, data } = yield call(getRecipesApi, action.params);

  if (ok) {
    yield put({ type: GET_RECIPES_SUCCESS, data });
  } else {
    yield put({ type: GET_RECIPES_FAILURE, err });
  }
}

import { combineReducers } from "redux";
import { recipesReducer } from "./recipesReducer";

export const rootReducer = combineReducers({
  recipes: recipesReducer,
});

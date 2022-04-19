import { combineReducers } from "redux";
import { recipesReducer } from "./recipesReducer";
import { eventReducer } from "./eventReducers";

export const rootReducer = combineReducers({
  recipes: recipesReducer,
  events: eventReducer,
});

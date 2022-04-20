import { combineReducers } from "redux";
import { eventReducer } from "./eventReducers";

export const rootReducer = combineReducers({
  events: eventReducer,
});

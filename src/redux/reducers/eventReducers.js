import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import {
  GET_EVENT_REQUEST,
  DELETE_EVENT_REQUEST,
  UPDATE_EVENT_REQUEST,
  ADD_EVENT_REQUEST,
} from "../types/eventTypes";

export const eventState = {
  eventData: null,
};

export const eventReducer = persistReducer(
  { storage, key: "event-data", whitelist: ["eventData"] },
  (state = eventState, action) => {
    switch (action.type) {
      case DELETE_EVENT_REQUEST:
        const afterDelete = state.eventData.filter(
          (item) => item.id !== action.id
        );
        return {
          ...state,
          eventData: afterDelete,
        };

      case UPDATE_EVENT_REQUEST:
        const afterUpdate = state.eventData
          .filter((item) => item.id !== action.id)
          .concat(action.data);
        return {
          ...state,
          eventData: afterUpdate,
        };

      case ADD_EVENT_REQUEST:
        const afterAdd =
          state.eventData === null
            ? new Array(action.data)
            : state.eventData.concat(action.data);
        return {
          ...state,
          eventData: afterAdd,
        };

      default:
        return state;
    }
  }
);

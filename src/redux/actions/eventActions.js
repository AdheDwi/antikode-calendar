import {
  ADD_EVENT_REQUEST,
  UPDATE_EVENT_REQUEST,
  DELETE_EVENT_REQUEST,
  GET_EVENT_REQUEST,
} from "../types/eventTypes";

export const addEventAction = (data) => ({
  type: ADD_EVENT_REQUEST,
  data,
});

export const updateEventAction = (id, data) => ({
  type: UPDATE_EVENT_REQUEST,
  id,
  data,
});

export const deleteEventAction = (id) => ({
  type: DELETE_EVENT_REQUEST,
  id,
});

export const getEventAction = () => ({
  type: GET_EVENT_REQUEST,
});

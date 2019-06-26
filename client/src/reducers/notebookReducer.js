import {
  LOAD_NOTEBOOKS,
  NOTEBOOK_ERROR,
  ADD_NOTEBOOK,
  DELETE_NOTEBOOK,
} from "../actions/types";

const initialState = {
  notebooks: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_NOTEBOOKS:
      return {
        ...state,
        notebooks: payload,
        loading: false
      }
    case ADD_NOTEBOOK:
      return {
        ...state,
        notebooks: [...state.notebooks, payload],
        loading: false
      }
    case DELETE_NOTEBOOK:
      return {
        ...state,
        notebooks: state.notebooks.filter(notebook => notebook._id !== payload),
        loading: false
      }
    case NOTEBOOK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}
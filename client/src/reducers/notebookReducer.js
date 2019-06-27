import {
  LOAD_NOTEBOOKS,
  GET_NOTEBOOK,
  NOTEBOOK_ERROR,
  ADD_NOTEBOOK,
  EDIT_NOTEBOOK,
  DELETE_NOTEBOOK,
} from "../actions/types";

const initialState = {
  notebooks: [],
  notes: [],
  name: "",
  loading: true
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
    case GET_NOTEBOOK:
      return {
        ...state,
        loading: false,
        name: payload.name,
        notes: payload.notes
      }
    case ADD_NOTEBOOK:
      return {
        ...state,
        notebooks: [...state.notebooks, payload],
        loading: false
      }
    case EDIT_NOTEBOOK:
      return state;
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

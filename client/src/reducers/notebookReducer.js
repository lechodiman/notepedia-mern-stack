import {
  LOAD_NOTEBOOKS,
  NOTEBOOK_ERROR,
} from "../actions/types";

const initialState = {
  notebooks: [
    {id: 1, name: "Calculus"},
    {id: 2, name: "Computer Science"},
    {id: 3, name: "Data Mining"},
    {id: 4, name: "History"}
  ]
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_NOTEBOOKS:
      return {
        ...state,
        notebooks: payload,
        loading: false
      };
    case NOTEBOOK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}

import { UPDATE_RESULTS } from "../actions/types";

const initialState = {
  results: [],
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_RESULTS:
      return {
        ...state,
        results: [...state.results, ...payload],
        loading: false
      };
    default:
      return state;
  }
};

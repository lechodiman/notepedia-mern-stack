import { LOAD_NOTES } from "../actions/types";

const initialState = {
  notes: [],
  note: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_NOTES:
      return {
        ...state,
        notes: payload
      };
    default:
      return state;
  }
};

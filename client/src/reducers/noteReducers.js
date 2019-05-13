import { LOAD_NOTES } from "../actions/types";

const initialState = {
  allNotes: [],
  myNote: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_NOTES:
      return {
        ...state,
        allNotes: payload
      };
    default:
      return state;
  }
};

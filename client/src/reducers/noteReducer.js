import { LOAD_NOTES, LOAD_SINGLE_NOTE } from "../actions/types";

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
    case LOAD_SINGLE_NOTE:
      return {
        ...state,
        myNote: payload
      };
    default:
      return state;
  }
};

import { LOAD_NOTES, GET_NOTE } from "../actions/types";

const initialState = {
  allNotes: [],
  myNote: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_NOTES:
      return {
        ...state,
        allNotes: payload,
      };
    case GET_NOTE:
      return {
        ...state,
        note: payload,
      };
    default:
      return state;
  }
};

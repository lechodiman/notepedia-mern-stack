<<<<<<< HEAD:client/src/reducers/noteReducer.js
import { LOAD_NOTES, LOAD_SINGLE_NOTE } from "../actions/types";
=======
import { LOAD_NOTES, GET_NOTE } from "../actions/types";
>>>>>>> origin/note-editor:client/src/reducers/noteReducers.js

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
    case LOAD_SINGLE_NOTE:
      return {
        ...state,
        myNote: payload
      };
    default:
      return state;
  }
};

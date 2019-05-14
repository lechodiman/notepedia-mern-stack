import {
  LOAD_NOTES,
  GET_NOTE,
  ADD_NOTE,
  DELETE_NOTE,
  NOTE_ERROR
} from "../actions/types";

const initialState = {
  allNotes: [],
  myNote: {},
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_NOTES:
      return {
        ...state,
        allNotes: payload,
        loading: false
      };
    case GET_NOTE:
      return {
        ...state,
        note: payload,
        loading: false
      };
    case ADD_NOTE:
      return {
        ...state,
        allNotes: [payload, ...state.allNotes],
        loading: false
      };
    case DELETE_NOTE:
      return {
        ...state,
        allNotes: state.allNotes.filter(note => note._id !== payload),
        loading: false
      };
    case NOTE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};

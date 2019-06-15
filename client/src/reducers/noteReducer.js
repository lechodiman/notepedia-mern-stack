import {
  ADD_NOTE,
  DELETE_NOTE,
  GET_NOTE,
  LOAD_NOTES,
  NOTE_ERROR,
  UPDATE_LIKES
} from "../actions/types";

const initialState = {
  notes: [],
  note: {},
  loading: true,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_NOTES:
      return {
        ...state,
        notes: payload,
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
        notes: [...state.notes, payload],
        loading: false
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== payload),
        loading: false
      };
    case NOTE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        notes: state.notes.map(note => {
          // Update likes of notes in the state
          if (note._id === payload.id) {
            return { ...note, likes: payload.likes };
          }

          return note;
        }),
        loading: false
      };
    default:
      return state;
  }
};

import {
  ADD_COMMENT,
  ADD_NOTE,
  DELETE_NOTE,
  GET_NOTE,
  LOAD_NOTES,
  NOTE_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES
} from "../actions/types";

const initialState = {
  notes: [],
  note: null,
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
    case ADD_COMMENT:
      return {
        ...state,
        note: { ...state.note, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        note: {
          ...state.note,
          comments: state.note.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
};

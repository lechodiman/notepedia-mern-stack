import { GET_BOOKMARKS, ADD_BOOKMARK, DELETE_BOOKMARK } from "../actions/types";

const initialState = {
  bookmarks: [],
  loading: true,
  error: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BOOKMARKS:
      return { ...state, bookmarks: payload, loading: false };
    case ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [payload, ...state.bookmarks],
        loading: false
      };
    case DELETE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(bookmark => bookmark._id !== payload),
        loading: false
      };
    case BOOKMARK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};

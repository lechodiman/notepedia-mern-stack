import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "/api/"
    : "http://localhost:5000/api/";

// Loads all notes from the DB
export function loadNotes() {
    return  async dispatch => {
        let res = axios.get('${url}notes');
        let notes = await res.data;
        dispatch({ type: "LOAD_NOTES", notes});
    }
}

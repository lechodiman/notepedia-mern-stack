import axios from "axios";
import { LOAD_NOTES } from "./types";

// const url =
//   process.env.NODE_ENV === "production"
//     ? "/api/"
//     : "http://localhost:5000/api/";

// Loads all notes from the DB
export const loadNotes = () => async dispatch => {
    const res = await axios.get("/api/notes");
    dispatch({ type: LOAD_NOTES, payload: res.data});
};

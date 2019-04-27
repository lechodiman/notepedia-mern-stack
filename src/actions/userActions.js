import axios from "axios";
const url =
  process.env.NODE_ENV === "production"
    ? "/api/"
    : "http://localhost:5000/api/";

export function getUser(_id) {
  return axios
    .get(`${url}user/${_id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}

export function getUserProfile(_id) {
  return dispatch => {
    axios
      .get(`${url}user/profile/${_id}`)
      .then(res => {
        let profile = res.data;
        dispatch({ type: "SET_PROFILE", profile });
      })
      .catch(err => console.log(err));
  };
}

//id, user_id
export function follow(id, user_id) {
  return dispatch => {
    axios
      .post(`${url}user/follow`, { id, user_id })
      .then(res => {
        dispatch({ type: "FOLLOW_USER", user_id });
      })
      .catch(err => console.log(err));
  };
}

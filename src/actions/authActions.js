import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "/api/"
    : "http://localhost:5000/api/";

export function SignInUser(user_data) {
  return dispatch => {
    axios
      .post(`${url}user`, user_data)
      .then(res => {
        let user = res.data;
        localStorage.setItem("Auth", JSON.stringify(user));
        dispatch({ type: "SET_USER", user });
      })
      .catch(err => console.log(err));
  };
}

export function SignOutUser() {
  return dispatch => {
    localStorage.removeItem("Auth");
    dispatch({ type: "SET_USER", user: {} });
  };
}

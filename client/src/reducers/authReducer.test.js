import reducer from "./authReducer";
import * as actionTypes from "../actions/types";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      isAuthenticated: null,
      loading: true,
      user: null
    });
  });

  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          isAuthenticated: null,
          loading: true,
          user: null
        },
        {
          type: actionTypes.LOGIN_SUCCESS,
          payload: {
            token: "some-token",
            user: "some-user"
          }
        }
      )
    ).toEqual({
      token: "some-token",
      isAuthenticated: true,
      loading: false,
      user: "some-user"
    });
  });
});

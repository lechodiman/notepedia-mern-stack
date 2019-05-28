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
});

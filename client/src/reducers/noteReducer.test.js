import reducer from "./noteReducer";
import * as actionTypes from "../actions/types";

describe("Note reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      notes: [],
      note: null,
      loading: true,
      error: {}
    });
  });

  it("should LOAD NOTES if the state is the initial state", () => {
    expect(
      reducer(
        {
          notes: [],
          note: null,
          loading: true,
          error: {}
        },
        {
          type: actionTypes.LOAD_NOTES,
          payload: [
            {
              id_: "noteId",
              text: "i'm a note"
            }
          ]
        }
      )
    ).toEqual({
      notes: [
        {
          id_: "noteId",
          text: "i'm a note"
        }
      ],
      note: null,
      loading: false,
      error: {}
    });
  });

  it("should GET NOTE if the state is the initial state", () => {
    expect(
      reducer(undefined, {
        type: actionTypes.LOAD_NOTES,
        payload: [
          {
            id_: "noteId",
            text: "i'm a note"
          }
        ]
      })
    ).toEqual({
      notes: [
        {
          id_: "noteId",
          text: "i'm a note"
        }
      ],
      note: null,
      loading: false,
      error: {}
    });
  });
});

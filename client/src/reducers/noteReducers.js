const initialState = {
  notes: [],
  note: {}
};

export default (state = initialState, action) => {
    switch (action.tyoe) {
        case "LOAD_NOTES":
            return {
                ...state,
                notes: action.notes
            };
        default:
            return state;
    }
};
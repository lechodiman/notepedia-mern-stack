const defaultState = {
  appName: "",
  modalMode: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      console.log("Toggling modal", action.modalMode);
      return { ...defaultState, modalMode: action.modalMode };

    default:
      return state;
  }
};

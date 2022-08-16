const defaultState = {
  appName: "",
  modalMode: false,
};

const variable = (state = defaultState, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      console.log("toggleModal");
      return {
        ...defaultState,
        modalMode: action.modalMode,
      };

    default:
      return state;
  }
};

export default variable;

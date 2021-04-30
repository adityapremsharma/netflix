import createDataContext from "./createDataContext";

const stylesReducer = (state, action) => {
  switch (action.type) {
    case "BACKGROUND_DARK":
      return { ...state, backgroundDark: action.payload };
    default:
      return state;
  }
};

const setBackgroundDark = (dispatch) => {
  return (getBackgroundDark) => {
    dispatch({ type: "BACKGROUND_DARK", payload: getBackgroundDark });
  };
};

export const { Context, Provider } = createDataContext(
  stylesReducer,
  {
    setBackgroundDark,
  },
  {
    backgroundDark: false,
  }
);

import createDataContext from "./createDataContext";

const stylesReducer = (state, action) => {
  switch (action.type) {
    case "BACKGROUND_Dark":
      return { ...state, backgroundDark: action.payload };
    default:
      return state;
  }
};

const setBackgroundDark = (dispatch) => {
  return (getBackgroundDark) => {
    dispatch({ type: "BACKGROUND_Dark", payload: getBackgroundDark });
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

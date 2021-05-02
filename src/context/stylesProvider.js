import createDataContext from "./createDataContext";

const stylesReducer = (state, action) => {
  switch (action.type) {
    case "BACKGROUND_DARK":
      return { ...state, backgroundDark: action.payload };
    case "EXPLORE_ALL_Display":
      return { ...state, exploreAllDisplay: action.payload };
    default:
      return state;
  }
};

const setBackgroundDark = (dispatch) => {
  return (getBackgroundDark) => {
    dispatch({ type: "BACKGROUND_DARK", payload: getBackgroundDark });
  };
};

const setExploreAllDisplay = (dispatch) => {
  return (getExploreAllDisplay) => {
    dispatch({ type: "EXPLORE_ALL_Display", payload: getExploreAllDisplay });
  };
};

export const { Context, Provider } = createDataContext(
  stylesReducer,
  {
    setBackgroundDark,
    setExploreAllDisplay,
  },
  {
    backgroundDark: false,
    exploreAllDisplay: false,
  }
);

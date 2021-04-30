import createDataContext from "./createDataContext";

const streamReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_INPUT":
      return { ...state, searchInput: action.payload };
    default:
      return state;
  }
};

const setSearchInput = (dispatch) => {
  return (getSearchInput) => {
    dispatch({ type: "SEARCH_INPUT", payload: getSearchInput });
  };
};

export const { Context, Provider } = createDataContext(
  streamReducer,
  {
    setSearchInput,
  },
  {
    searchInput: "",
  }
);

export const actionCreator = {
  SET_AUTH: "SET_AUTH",
  REMOVE_AUTH: "REMOVE_AUTH",
  SET_SESSION: "SET_SESSION",
  REMOVE_SESSION: "REMOVE_SESSION",
};

const reducer = (state: any, action: { type: string; payload?: object | string }) => {
  switch (action.type) {
    case actionCreator.SET_AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case actionCreator.REMOVE_AUTH:
      return {
        ...state,
        auth: null,
      };
    case actionCreator.SET_SESSION:
      return {
        ...state,
        token: action.payload,
      };
    case actionCreator.REMOVE_SESSION:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;

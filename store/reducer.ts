export const actionCreator = {
  SET_AUTH: "SET_AUTH",
  REMOVE_AUTH: "REMOVE_AUTH",
  SET_SESSION: "SET_SESSION",
  REMOVE_SESSION: "REMOVE_SESSION",
  SET_DATA: "SET_DATA",
  CLEAR_DATA: "CLEAR_DATA",
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
        session: action.payload,
      };
    case actionCreator.REMOVE_SESSION:
      return {
        ...state,
        session: null,
      };
    case actionCreator.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case actionCreator.CLEAR_DATA:
      return {
        ...state,
        data: {},
      };
    default:
      return state;
  }
};

export default reducer;

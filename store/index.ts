import { createContext } from "react";

import { InitialState } from "@helpers/types";

//initial state
export const initialState = {
  user: null,
  auth: false,
  status: "not loading",
  session: {},
};

//context provider
const AppContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export default AppContext;

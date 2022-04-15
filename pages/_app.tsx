import AppContext, { initialState } from "@store/index";
import reducer from "@store/reducer";
import "@styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useReducer } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </AppContext.Provider>
  );
}

export default MyApp;

import AppContext, { initialState } from "@store/index";
import reducer from "@store/reducer";
import "@styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useReducer } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <SessionProvider session={session}>
        <ToastContainer
          autoClose={8000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover
          limit={2}
        />
        <Component {...pageProps} />
      </SessionProvider>
    </AppContext.Provider>
  );
}

export default MyApp;

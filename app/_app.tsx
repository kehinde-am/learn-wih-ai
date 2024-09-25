// pages/_app.tsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppProps } from "next/app";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    listenToAuthChanges(dispatch);
  }, [dispatch]);

  return <Component {...pageProps} />;
}

export default MyApp;
function listenToAuthChanges(dispatch: Dispatch<UnknownAction>) {
  throw new Error("Function not implemented.");
}

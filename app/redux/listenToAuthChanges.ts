// listenToAuthChanges.ts
import { Dispatch } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { signIn, signOutUser } from "./authSlice";

export const listenToAuthChanges = (dispatch: Dispatch<any>) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // Only dispatch sign-in action if user is not already signed in
      dispatch(signIn({ email: user.email || "", password: "" }));
    } else {
      dispatch(signOutUser());
    }
  });
};

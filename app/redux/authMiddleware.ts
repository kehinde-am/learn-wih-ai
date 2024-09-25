import { Dispatch } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { signIn, signOutUser } from "./authSlice";

export const listenToAuthChanges = (dispatch: Dispatch<any>) => {
  return onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed:", user);
    if (user) {
      // Handle sign-in action
      dispatch(signIn({ email: user.email || "", password: "" }));
    } else {
      // Handle sign-out action
      dispatch(signOutUser());
    }
  });
};

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";

interface AuthState {
  userEmail: any;
  user: { email: string } | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
  isRegistering: boolean; // Add this field
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  isRegistering: false,
  userEmail: undefined,
};

interface SignInPayload {
  email: string;
  password?: string; // Password is optional for Google sign-in
}

// Async thunk for signing in
export const signIn = createAsyncThunk<{ email: string }, SignInPayload>(
  "auth/signIn",
  async ({ email, password = "" }, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return { email: user.email || "" };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for signing out
export const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for user sign-up (create account)
export const createUser = createAsyncThunk<{ email: string }, SignInPayload>(
  "auth/createUser",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setIsRegistering(true)); // Set registering to true
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password!
      );
      dispatch(setIsRegistering(false)); // Clear registering state on success
      return { email: user.email || "" };
    } catch (error) {
      dispatch(setIsRegistering(false)); // Clear registering state on failure
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for Google sign-in
export const googleSignIn = createAsyncThunk<{ email: string }>(
  "auth/googleSignIn",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return { email: result.user.email || "" };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsRegistering(state, action) {
      state.isRegistering = action.payload; // Action to set the registering state
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle signIn
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Handle signOutUser
      .addCase(signOutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Handle createUser (sign-up)
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Handle googleSignIn
      .addCase(googleSignIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setIsRegistering } = authSlice.actions;
export default authSlice.reducer;

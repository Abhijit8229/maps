import { createSlice } from "@reduxjs/toolkit";
import { User, onAuthStateChanged } from "firebase/auth";
import { RootState } from "./store";
import { auth } from "../firebaseConfig";

export interface UserState {
  loading: string;
  value: User | {};
  error: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  loading: "idle",
  value: {},
  error: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    retainUser: (state, action) => {
      if (state.value === action.payload) {
        return;
      }
      state.loading = "loading";
      state.value = action.payload;
      state.loading = "success";
      state.error = false;
    },
  },
});
export const checkAuth = () => (dispatch: any) => {
  const sub = onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(retainUser(user));
    }
  });
  return sub;
};

export const { retainUser } = authSlice.actions;
export const selecteduser = (state: RootState) => state.auth.value;
export const loading = (state: RootState) => state.auth.loading;
export const err = (state: RootState) => state.auth.error;
export default authSlice.reducer;

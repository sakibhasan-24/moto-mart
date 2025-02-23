import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthState = {
  user: null | object;
  token: null | string;
};

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");
const initialState: TAuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: TAuthState["user"]; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload?.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

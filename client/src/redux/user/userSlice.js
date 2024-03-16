import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  photo: "",
  role: "",
  active: false,
  createdAt: "",
  status: "idle",
  error: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      state.role = action.payload.role;
      state.active = action.payload.active;
      state.createdAt = action.payload.createdAt;
      state.id = action.payload._id;
    },
    setUserUpdate(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      state.createdAt = action.payload.createdAt;
      state.id = action.payload._id;
    },
    setUserLogout(state) {
      state = state.initialState;
    },
  },
});

export const { setUserData, setUserLogout, setUserUpdate } = userSlice.actions;

export default userSlice.reducer;

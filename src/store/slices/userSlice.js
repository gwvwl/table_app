import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signIn = createAsyncThunk(
  "user/signIn",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      await fetch(`https://api.gwvwl.site/signin`, {
        method: "post",
        body: body,
      })
        .then((result) => result.json())
        .then((data) => dispatch(setUser(data.data)));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setPending = (state) => {
  state.loading = false;
  state.error = null;
};
const setRejected = (state, action) => {
  state.loading = true;
  state.error = action.payload;
};

const user = createSlice({
  name: "user",
  initialState: {
    token: false,
    user: [],
    admin: false,
    loading: null,
    error: null,
  },
  reducers: {
    setUser(state, { payload }) {
      state.token = payload.token;
      state.admin = payload.admin;
      state.user = payload.user;
    },
    logout(state) {
      state.token = false;
    },
  },
  extraReducers: {
    [signIn.pending]: setPending,
    [signIn.fulfilled]: setPending,
    [signIn.rejected]: setRejected,
  },
});

export const { setUser, logout } = user.actions;

export default user.reducer;

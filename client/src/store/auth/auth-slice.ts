import { createSlice } from '@reduxjs/toolkit';
import { AuthSliceState } from './types/AuthSliceState';

const initialState: AuthSliceState = {
  user: null,
  IsAuth: false,
};

const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setAuth: (state, action) => {
      state.IsAuth = action.payload;
    },
  },
});

export const { setUser, removeUser, setAuth } = authSlice.actions;
export default authSlice.reducer;

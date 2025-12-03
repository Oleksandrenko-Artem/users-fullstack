import { createSlice } from '@reduxjs/toolkit';

const USERS_SLICE_NAME = 'users';

const initialState = {
  users: [],
  isFetching: false,
  error: null,
};

const usersSlice = createSlice({
  name: USERS_SLICE_NAME,
  initialState,
});

const { reducer } = usersSlice;

export default reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from './../../api/index';


const USERS_SLICE_NAME = 'users';

const initialState = {
  users: [],
  isFetching: false,
  error: null,
};

export const getUsersThunk = createAsyncThunk(`${USERS_SLICE_NAME}/getUsers`, async (_, thunkAPI) => {
  try {
    const result = await getUsers();
    return result.data.data;
  } catch (error) {
    console.log('error ===>', error);
    return thunkAPI.rejectWithValue({});
  }
});

const usersSlice = createSlice({
  name: USERS_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    builder.addCase(getUsersThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    });
    builder.addCase(getUsersThunk.rejected, (state, action)  => {
      state.isFetching = false;
      state.error = action.payload;
    });
  },
});

const { reducer } = usersSlice;

export default reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteUsers, getUsers } from './../../api/index';

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

export const deleteUsersThunk = createAsyncThunk(`${USERS_SLICE_NAME}/deleteUsers`, async (id, thunkAPI) => {
  try {
    await deleteUsers(id);
    return id;
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
    builder.addCase(deleteUsersThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    });
    builder.addCase(deleteUsersThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.users = state.users.filter(u => u.id !== action.payload);
    });
    builder.addCase(getUsersThunk.rejected, (state, action)  => {
      state.isFetching = false;
      state.error = action.payload;
    });
    builder.addCase(deleteUsersThunk.rejected, (state, action) => {
      state.isFetching = false;
      state.error = null;
    });
  },
});

const { reducer } = usersSlice;

export default reducer;

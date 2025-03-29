
import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchPostRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostSuccess: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    fetchPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const { fetchPostRequest, fetchPostSuccess, fetchPostFailure } = postSlice.actions;
export default postSlice.reducer;
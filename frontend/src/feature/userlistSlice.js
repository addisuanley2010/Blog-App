import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
        
        loading: false,
        isAuthenticated: false,
        success: false,
        message: '',
        token: '',
        users: [],
};

const usersSlice = createSlice({
        name: 'usersList',
        initialState,
        reducers: {
                loading: (state, action) => {
                        state.loading = action.payload
                        state.isAuthenticated = false
                        state.user = initialState.user
                        state.success = false
                        state.message = ''
                        state.token = ''
                        state.users = []
                        return state
                },

                addUsersToStore: (state, action) => {
                        state.users = action.payload || []
                        state.loading = false
                        state.success = action.payload.success
                        state.isAuthenticated = action.payload.isAuthenticated
                        state.message = action.payload.message
                        state.token = action.payload.token
                        return state
                }
        }
})
export const { addUsersToStore, loading } = usersSlice.actions
export default usersSlice.reducer;
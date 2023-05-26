import { createSlice } from '@reduxjs/toolkit'

export interface LoginPayload {
    username?: string
    password?: string
}

export interface Users {
    token: string | null
    user: any
    isLoading: boolean
    error: any,
}

const initialState: Users = {
    token: null,
    user: {},
    error: null,
    isLoading: false,
}

const userSlice = createSlice({
    name: 'userInfo',
    initialState: initialState,
    reducers:
    {
        loginStart: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: state => {
            state.token = null;
            state.user = null;
        },
        registerStart(state,action) {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess(state, action) {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = null;
        },
        registerFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        getUserInfo: () => { },
        getUserInfoSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        getUserFailure: (state, action) => {
            state.user = null;
            state.error = action.payload.error;
        },
    }
})

export const userAction = userSlice.actions;

//selector
export const selectUser = (state: any) => state.user;

//reducer
const userReducer = userSlice.reducer;

export default userReducer;
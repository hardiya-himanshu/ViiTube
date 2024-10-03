import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : localStorage.getItem("status") || false,
    userData: null,
    // accessToken: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            localStorage.setItem("status", true);
            // state.accessToken = action.payload.data.accessToken;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            localStorage.removeItem("status");
            // state.accessToken = null;
        },
        refreshAccessToken: (state, action) => {
            state.accessToken = action.payload.data.accessToken;
        }
    }
})

export const {login, logout, refreshAccessToken} = authSlice.actions
export default authSlice.reducer
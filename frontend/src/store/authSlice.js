import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    refreshToken: null,
    accessToken: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.refreshToken = action.payload.refreshToken;
            state.accessToken = action.payload.accessToken;
            console.log("changed and data stored\n");
            console.log(action.payload.refreshToken);
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.refreshToken = null;
            localStorage.removeItem("refreshToken");
        },
        refreshAccessToken: (state, action) => {
            state.accessToken = action.payload.data.accessToken;
        }
    }
})

export const {login, logout, refreshAccessToken} = authSlice.actions
export default authSlice.reducer
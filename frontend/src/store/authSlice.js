import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    refreshToken: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            console.log("changed and data stored\n");
            state.refreshToken = action.payload.data.refreshToken;
            console.log(action.payload.data.refreshToken);
            localStorage.setItem("refreshToken", action.payload.data.refreshToken);
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.refreshToken = null;
            localStorage.removeItem("refreshToken");
        }
    }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer
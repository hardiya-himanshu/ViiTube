import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './themeSlice'
import authSlice from './authSlice';


const store = configureStore({
    reducer: {
        theme : themeReducer,
        auth : authSlice,
    }
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
// import articleReducer from './articleSlice'
// import paginationReducer from './paginationSlice'
// import authReducer from './authSlice'
import transactionReducers from "./transaction.js/transactionSlice";

const store = configureStore({
    reducer: {
        transaction : transactionReducers
        // pagination: paginationReducer,
        // auth: authReducer
    }
})

export default store;
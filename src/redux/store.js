import {configureStore } from "@reduxjs/toolkit";
import transactionReducers from "./transaction.js/transactionSlice";
import categoryReducers from "./category/categorySlice";
import accountReducers from "./account/accountSlice";

const store = configureStore({
    reducer: {
        transaction : transactionReducers,
        category : categoryReducers,
        account : accountReducers
    },
    
})

export default store;
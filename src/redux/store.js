import { configureStore } from "@reduxjs/toolkit";
import transactionReducers from "./transaction.js/transactionSlice";
import categoryReducers from "./category/categorySlice";
import accountReducers from "./account/accountSlice";
import menuReducers from "./menu/menuSlice";
import authReducers from "./auth/loginSlice";

const store = configureStore({
    reducer: {
        transaction: transactionReducers,
        category: categoryReducers,
        account: accountReducers,
        menu: menuReducers,
        auth: authReducers
    },
})

export default store;
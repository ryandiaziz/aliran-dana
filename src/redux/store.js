import { configureStore } from "@reduxjs/toolkit";
import transactionReducers from "./transaction.js/transactionSlice";
import categoryReducers from "./category/categorySlice";
import accountReducers from "./account/accountSlice";
import dialogReducers from "./dialog/dialogSlice";

const store = configureStore({
    reducer: {
        transaction: transactionReducers,
        category: categoryReducers,
        account: accountReducers,
        dialog: dialogReducers
    },

})

export default store;
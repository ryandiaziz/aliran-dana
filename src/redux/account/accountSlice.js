import { createSlice} from '@reduxjs/toolkit'

import { createAccount, listAccounts } from './accountReducers'

const initialState = {
    loading: false,
    accounts: [],
    error: '',
    result: {}
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    extraReducers: (builder) => {
        // FETCH LIST ACCOUNT
        builder.addCase(listAccounts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(listAccounts.fulfilled, (state, action) => {            
            state.loading = false;
            state.accounts = action.payload.response.data;
        });
        builder.addCase(listAccounts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // CREATE ACCOUNT
        builder.addCase(createAccount.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.result = action.payload;
        });
        builder.addCase(createAccount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default accountSlice.reducer;
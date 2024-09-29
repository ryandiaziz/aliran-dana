import { createSlice } from '@reduxjs/toolkit'

import { createAccount, deleteAccount, listAccounts, updateAccount } from './accountReducers'

const initialState = {
    loading: false,
    accounts: [],
    error: '',
    result: {},
    selected: {
        id: 0,
        name: '',
        balance: 0
    }
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setSelectedAccount: (state, action) => {
            state.selected.id = action.payload.value;
            state.selected.name = action.payload.name;
            state.selected.balance = action.payload.balance;            
        }
    },
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
        // UPDATE ACCOUNT
        builder.addCase(updateAccount.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.result = action.payload;
        })
        builder.addCase(updateAccount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // DELETE ACCOUNT
        builder.addCase(deleteAccount.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteAccount.fulfilled, (state, action) => {
            state.loading = false;
            state.result = action.payload;
        })
        builder.addCase(deleteAccount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default accountSlice.reducer;
export const { setSelectedAccount } = accountSlice.actions;
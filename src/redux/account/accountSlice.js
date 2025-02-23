import { createSlice } from '@reduxjs/toolkit'

import { createAccount, deleteAccount, listAccounts, updateAccount } from './accountReducers'

const initialState = {
    isAccountInitial: true,
    accounts: [],
    totalBalance: 0,
    list: {
        isLoading: false,
        isError: false,
        errorMessage: '',
        result: {}
    },
    create: {
        isLoading: false,
        isError: false,
        errorMessage: '',
        result: {}
    },
    update: {
        isLoading: false,
        isError: false,
        errorMessage: '',
        result: {}
    },
    delete: {
        isLoading: false,
        isError: false,
        errorMessage: '',
        result: {}
    },
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
        },
        setIsAccountInitial: (state, action) => {
            state.isAccountInitial = action.payload;
        }
    },
    extraReducers: (builder) => {
        // FETCH LIST ACCOUNT
        builder.addCase(listAccounts.pending, (state) => {
            state.list.isLoading = true;
            state.list.isError = false;
        });
        builder.addCase(listAccounts.fulfilled, (state, action) => {
            if (state.isAccountInitial) state.isAccountInitial = false;
            state.list.isLoading = false;
            state.accounts = action.payload.response.data.accounts;
            state.totalBalance = action.payload.response.data.total;
        });
        builder.addCase(listAccounts.rejected, (state, action) => {
            state.list.isLoading = false;
            state.list.isError = true;
            state.list.errorMessage = action.payload;
        });
        // CREATE ACCOUNT
        builder.addCase(createAccount.pending, (state) => {
            state.create.isLoading = true;
            state.create.isError = false;
        });
        builder.addCase(createAccount.fulfilled, (state, action) => {
            state.create.isLoading = false;
            state.create.result = action.payload;
        });
        builder.addCase(createAccount.rejected, (state, action) => {
            state.create.isLoading = false;
            state.create.isError = true;
            state.create.errorMessage = action.payload;
        })
        // UPDATE ACCOUNT
        builder.addCase(updateAccount.pending, (state) => {
            state.update.isLoading = true;
            state.update.isError = false;
        })
        builder.addCase(updateAccount.fulfilled, (state, action) => {
            state.update.isLoading = false;
            state.update.result = action.payload;
        })
        builder.addCase(updateAccount.rejected, (state, action) => {
            state.update.isLoading = false;
            state.update.isError = true;
            state.update.errorMessage = action.payload;
        })
        // DELETE ACCOUNT
        builder.addCase(deleteAccount.pending, (state) => {
            state.delete.isLoading = true;
            state.delete.isError = false;
        })
        builder.addCase(deleteAccount.fulfilled, (state, action) => {
            state.delete.isLoading = false;
            state.delete.result = action.payload;
        })
        builder.addCase(deleteAccount.rejected, (state, action) => {
            state.delete.isLoading = false;
            state.delete.isError = true;
            state.delete.errorMessage = action.payload;
        })
    }
})

export default accountSlice.reducer;
export const {
    setSelectedAccount,
    setIsAccountInitial
} = accountSlice.actions;
import { createSlice } from '@reduxjs/toolkit'

import { listTransactions, createTransactions, transferTransactions } from './transactionReducers'

const initialState = {
    isTransactionInitial: true,
    count: {
        income: 0,
        expense: 0
    },
    list: {
        isLoading: false,
        isError: false,
        errorMessage: '',
        transactions: []
    },
    create: {
        isLoading: false,
        isError: false,
        errorMessage: '',
        transactions: []
    },
    transfer: {
        isLoading: false,
        isError: false,
        errorMessage: '',
        transactions: []
    },
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setError: (state) => {
            state.create.isError = false;
        }
    },
    extraReducers: (builder) => {
        // FETCH LIST TRANSACTIONS
        builder.addCase(listTransactions.pending, (state) => {
            state.list.isError = false;
            state.list.isLoading = true;
        });
        builder.addCase(listTransactions.fulfilled, (state, action) => {
            state.list.isLoading = false;
            if (state.isTransactionInitial) state.isTransactionInitial = false;
            if (action.payload.response) {
                state.list.transactions = action.payload.response.data.transactions;
                state.count.income = action.payload.response.data.count.income;
                state.count.expense = action.payload.response.data.count.expense;
            }
        });
        builder.addCase(listTransactions.rejected, (state, action) => {
            state.list.isLoading = false;
            state.list.isError = true;
            state.list.errorMessage = action.payload;
        });
        // CREATE TRANSACTION
        builder.addCase(createTransactions.pending, (state) => {
            state.create.isLoading = true;
            state.create.isError = false;
        });
        builder.addCase(createTransactions.fulfilled, (state, action) => {
            state.create.isLoading = false;
            state.create.transactions = action.payload;
        });
        builder.addCase(createTransactions.rejected, (state, action) => {
            state.create.isLoading = false;
            state.create.isError = true;
            state.create.errorMessage = action.payload;
        });
        // TRANSFER TRANSACTION
        builder.addCase(transferTransactions.pending, (state) => {
            state.transfer.isLoading = true;
            state.transfer.isError = false;
        });
        builder.addCase(transferTransactions.fulfilled, (state, action) => {
            state.transfer.isLoading = false;
            state.transfer.transactions = action.payload;
        });
        builder.addCase(transferTransactions.rejected, (state, action) => {
            state.transfer.isLoading = false;
            state.transfer.isError = true;
            state.transfer.errorMessage = action.payload;
        });
    }
})

export default transactionSlice.reducer;
export const { setError } = transactionSlice.actions
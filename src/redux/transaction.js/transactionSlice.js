import { createSlice } from '@reduxjs/toolkit'

// import { setpagination } from './paginationSlice'
import { listTransactions, createTransactions } from './transactionReducers'

const initialState = {
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
    }
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
            if (action.payload.response) state.list.transactions = action.payload.response.data;
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
    }
})

export default transactionSlice.reducer;
export const { setError } = transactionSlice.actions
import { createSlice } from '@reduxjs/toolkit'

import { groupByDate } from '../../utils/helper';
import {
    filterTransactions,
    createTransactions,
    transferTransactions,
    getSummaryCategory,
    getSummaryTrend
} from './transactionReducers'

const initialState = {
    isTransactionInitial: true,
    count: {
        income: 0,
        expense: 0,
        total: 0
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
    summaryCategory: {
        isLoading: false,
        isError: false,
        errorMessage: '',
        data: []
    },
    summaryTrend: {
        isLoading: false,
        isError: false,
        errorMessage: '',
        data: []
    }
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setError: (state) => {
            state.create.isError = false;
        },
        setIsTransactionInitial: (state, action) => {
            state.isTransactionInitial = action.payload;
        }
    },
    extraReducers: (builder) => {
        // FETCH LIST TRANSACTIONS
        builder.addCase(filterTransactions.pending, (state) => {
            state.list.isError = false;
            state.list.isLoading = true;
        });
        builder.addCase(filterTransactions.fulfilled, (state, action) => {
            state.list.isLoading = false;
            if (state.isTransactionInitial) state.isTransactionInitial = false;
            if (action.payload.response) {
                state.list.transactions = groupByDate(action.payload.response.data.transactions);
                state.count.income = action.payload.response.data.count.income;
                state.count.expense = action.payload.response.data.count.expense;
                state.count.total = action.payload.response.data.count.total;
            }
        });
        builder.addCase(filterTransactions.rejected, (state, action) => {
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
        // SUMMARY CATEGORY
        builder.addCase(getSummaryCategory.pending, (state) => {
            state.summaryCategory.isLoading = true;
            state.summaryCategory.isError = false;
        });
        builder.addCase(getSummaryCategory.fulfilled, (state, action) => {
            state.summaryCategory.isLoading = false;
            state.summaryCategory.data = action.payload.response.data;
        });
        builder.addCase(getSummaryCategory.rejected, (state, action) => {
            state.summaryCategory.isLoading = false;
            state.summaryCategory.isError = true;
            state.summaryCategory.errorMessage = action.payload;
        });
        // SUMMARY TREND
        builder.addCase(getSummaryTrend.pending, (state) => {
            state.summaryTrend.isLoading = true;
            state.summaryTrend.isError = false;
        });
        builder.addCase(getSummaryTrend.fulfilled, (state, action) => {
            state.summaryTrend.isLoading = false;
            state.summaryTrend.data = action.payload.response.data;
        });
        builder.addCase(getSummaryTrend.rejected, (state, action) => {
            state.summaryTrend.isLoading = false;
            state.summaryTrend.isError = true;
            state.summaryTrend.errorMessage = action.payload;
        });
    }
})

export default transactionSlice.reducer;
export const {
    setError,
    setIsTransactionInitial
} = transactionSlice.actions
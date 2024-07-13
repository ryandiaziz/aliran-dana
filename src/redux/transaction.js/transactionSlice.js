import { createSlice} from '@reduxjs/toolkit'

// import { setpagination } from './paginationSlice'
import { listTransactions } from './transactionReducers'

const initialState = {
    loading: false,
    transactions: [],
    error: ''
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    extraReducers: (builder) => {
        // fetch
        builder.addCase(listTransactions.pending, (state) => {
            state.loading = true
        })
        builder.addCase(listTransactions.fulfilled, (state, action) => {            
            state.loading = false
            state.transactions = action.payload.response.data
        })
        builder.addCase(listTransactions.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // search
        // builder.addCase(searchArticles.pending, (state) => {
        //     state.loading = true
        // })
        // builder.addCase(searchArticles.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.articles = action.payload
        // })
        // builder.addCase(searchArticles.rejected, (state, action) => {
        //     state.loading = false
        //     state.error = action.payload
        // })
    }
})

export default transactionSlice.reducer;
import { createSlice} from '@reduxjs/toolkit'

import { listAccounts } from './accountReducers'

const initialState = {
    loading: false,
    accounts: [],
    error: ''
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    extraReducers: (builder) => {
        // fetch
        builder.addCase(listAccounts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(listAccounts.fulfilled, (state, action) => {            
            state.loading = false
            state.accounts = action.payload.response.data
        })
        builder.addCase(listAccounts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default accountSlice.reducer;
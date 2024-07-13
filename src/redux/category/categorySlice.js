import { createSlice} from '@reduxjs/toolkit'

import { listCategories } from './categoryReducers'

const initialState = {
    loading: false,
    categories: [],
    error: ''
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: (builder) => {
        // fetch
        builder.addCase(listCategories.pending, (state) => {
            state.loading = true
        })
        builder.addCase(listCategories.fulfilled, (state, action) => {            
            state.loading = false
            state.categories = action.payload.response.data
        })
        builder.addCase(listCategories.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default categorySlice.reducer;
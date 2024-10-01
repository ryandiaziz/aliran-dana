import { createSlice } from '@reduxjs/toolkit'

import { createCategory, deleteCategory, listCategories, updateCategory } from './categoryReducers'

const initialState = {
    isCategoryInitial: true,
    loading: false,
    categories: [],
    error: '',
    result: {},
    selected: {
        id: 0,
        name: '',
        type: ''
    }
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selected.id = action.payload.value;
            state.selected.name = action.payload.name;
            state.selected.type = action.payload.type;
        }
    },
    extraReducers: (builder) => {
        // FETCH LIST CATEGORY
        builder.addCase(listCategories.pending, (state) => {
            state.loading = true
        })
        builder.addCase(listCategories.fulfilled, (state, action) => {
            state.loading = false
            if (state.isCategoryInitial) state.isCategoryInitial = false
            state.categories = action.payload.response.data
        })
        builder.addCase(listCategories.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // CREATE CATEGORY
        builder.addCase(createCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.result = action.payload;
        });
        builder.addCase(createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // UPDATE CATEGORY
        builder.addCase(updateCategory.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.result = action.payload;
        })
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // DELETE CATEGORY
        builder.addCase(deleteCategory.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.result = action.payload;
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default categorySlice.reducer;
export const { setSelectedCategory } = categorySlice.actions;
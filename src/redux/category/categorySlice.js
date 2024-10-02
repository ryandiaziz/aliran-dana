import { createSlice } from '@reduxjs/toolkit'

import { createCategory, deleteCategory, listCategories, updateCategory } from './categoryReducers'

const initialState = {
    isCategoryInitial: true,
    categories: [],
    selected: {
        id: 0,
        name: '',
        type: ''
    },
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
            state.list.isLoading = true;
            state.list.isError = false;
        })
        builder.addCase(listCategories.fulfilled, (state, action) => {
            if (state.isCategoryInitial) state.isCategoryInitial = false;
            state.categories = action.payload.response.data;
            state.list.isLoading = false;
        })
        builder.addCase(listCategories.rejected, (state, action) => {
            state.list.isLoading = false;
            state.list.isError = true;
            state.list.errorMessage = action.payload;
        })
        // CREATE CATEGORY
        builder.addCase(createCategory.pending, (state) => {
            state.create.isLoading = true;
            state.create.isError = false;
        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.create.isLoading = false;
            state.create.result = action.payload;
        });
        builder.addCase(createCategory.rejected, (state, action) => {
            state.create.isLoading = false;
            state.create.isError = true;
            state.create.errorMessage = action.payload;
        })
        // UPDATE CATEGORY
        builder.addCase(updateCategory.pending, (state) => {
            state.update.isLoading = true;
            state.update.isError = false;
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.update.isLoading = false;
            state.update.result = action.payload;
        })
        builder.addCase(updateCategory.rejected, (state, action) => {
            state.update.isLoading = false;
            state.update.isError = true;
            state.update.errorMessage = action.payload;
        })
        // DELETE CATEGORY
        builder.addCase(deleteCategory.pending, (state) => {
            state.delete.isLoading = true;
            state.delete.isError = false;
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.delete.isLoading = false;
            state.delete.result = action.payload;
        })
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.delete.isLoading = false;
            state.delete.isError = true;
            state.delete.errorMessage = action.payload;
        })
    }
})

export default categorySlice.reducer;
export const { setSelectedCategory } = categorySlice.actions;
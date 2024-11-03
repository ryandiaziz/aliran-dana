import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dialog: {
        isOpen: false,
        title: 'Are you sure?',
        desc: 'This change cannot be reversed.',
        type: null,
        data: null
    },
    transactionSearch: {
        isOpen: false,
        anchor: 'right'
    },
    categorySearch: {
        isOpen: false,
        anchor: 'right'
    }
}

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setDialogOpen: (state, action) => {
            state.dialog.isOpen = !state.dialog.isOpen;
            if (action.payload) {
                const { title, desc, type, data } = action.payload;
                if (title) state.dialog.title = title;
                if (desc) state.dialog.desc = desc;
                if (type) state.dialog.type = type;
                if (data) state.dialog.data = data;
            }
        },
        setTransactionSearch: (state, action) => {
            state.transactionSearch.isOpen = action.payload;
        },
        setCategorySearch: (state, action) => {
            state.categorySearch.isOpen = action.payload;
        }
    }
})

export default menuSlice.reducer;
export const {
    setDialogOpen,
    setTransactionSearch,
    setCategorySearch
} = menuSlice.actions;
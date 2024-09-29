import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    title: 'Are you sure?',
    desc: 'This change cannot be reversed.',
    type: null,
    data: null
}

const dialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        setDialogOpen: (state, action) => {
            state.isOpen = !state.isOpen;
            if (action.payload) {
                const { title, desc, type, data } = action.payload;
                if (title) state.title = title;
                if (desc) state.desc = desc;
                if (type) state.type = type;
                if (data) state.data = data;
            }
        }
    }
})

export default dialogSlice.reducer;
export const { setDialogOpen } = dialogSlice.actions;
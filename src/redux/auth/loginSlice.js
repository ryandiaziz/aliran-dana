import { createSlice } from '@reduxjs/toolkit';
import { authLogin } from './loginReducers';

const initialState = {
    isAuthInitial: true,
    login: {
        isLoading: false,
        isError: false,
        errorMessage: '',
        token: ''
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    // reducers: {
    //     setSelectedCategory: (state, action) => {
    //         state.selected.id = action.payload.value;
    //         state.selected.name = action.payload.name;
    //         state.selected.type = action.payload.type;
    //     },
    //     setCategoriesFilter: (state, action) => {
    //         if (action.payload !== 'all') {
    //             state.categoriesFilter = state.categories.filter((value) => value.category_type === action.payload);
    //         } else {
    //             state.categoriesFilter = state.categories;
    //         }

    //     }
    // },
    extraReducers: (builder) => {
        // LOGIN
        builder.addCase(authLogin.pending, (state) => {
            state.login.isLoading = true;
            state.login.isError = false;
        });
        builder.addCase(authLogin.fulfilled, (state, action) => {
            console.log("auth payload : ", action.payload);            
            if (state.isAuthInitial) state.isAuthInitial = false;
            state.login.token = action.payload.response.data;
            localStorage.setItem('token', state.login.token);
            state.login.isLoading = false;
        });
        builder.addCase(authLogin.rejected, (state, action) => {
            console.log(action.payload);
            
            state.login.isLoading = false;
            state.login.isError = true;
            state.login.errorMessage = action.payload;
        });
    }
})

export default authSlice.reducer;
// export const {
//     setSelectedCategory,
//     setCategoriesFilter
// } = authSlice.actions;
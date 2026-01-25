import { createSlice } from '@reduxjs/toolkit';
import { authLogin, authRegister } from './authReducers';

const initialState = {
    isAuthInitial: true,
    login: {
        isLoading: false,
        isError: false,
        errorMessage: '',
        token: ''
    },
    register: {
        isLoading: false,
        isError: false,
        errorMessage: '',
        data: ''
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogout: (state) => {
            state.login.token = '';
            state.login.isError = false;
            state.login.errorMessage = '';
            state.isAuthInitial = true;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        // LOGIN
        builder.addCase(authLogin.pending, (state) => {
            state.login.isLoading = true;
            state.login.isError = false;
        });
        builder.addCase(authLogin.fulfilled, (state, action) => {
            if (state.isAuthInitial) state.isAuthInitial = false;
            state.login.token = action.payload.response.data;
            localStorage.setItem('token', state.login.token);
            state.login.isLoading = false;
        });
        builder.addCase(authLogin.rejected, (state, action) => {
            state.login.isLoading = false;
            state.login.isError = true;
            state.login.errorMessage = action.payload;
        });
        builder.addCase(authRegister.pending, (state) => {
            state.register.isLoading = true;
            state.register.isError = false;
        });
        builder.addCase(authRegister.fulfilled, (state, action) => {
            state.register.isLoading = false;
            state.register.data = action.payload;
        });
        builder.addCase(authRegister.rejected, (state, action) => {
            state.register.isLoading = false;
            state.register.isError = true;
            state.register.errorMessage = action.payload;
        });
    }
})

export default authSlice.reducer;
export const { authLogout } = authSlice.actions;
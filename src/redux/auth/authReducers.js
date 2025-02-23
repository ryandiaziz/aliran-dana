import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { config } from '../../utils/config';
import { setIsAccountInitial } from '../account/accountSlice';
import { setIsCategoryInitial } from '../category/categorySlice';
import { setIsTransactionInitial } from '../transaction.js/transactionSlice';

const { apiUrl } = config();
const URL = `${apiUrl}/api/users`;

export const authLogin = createAsyncThunk('auth/authLogin', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${URL}/login`,
            data
        });

        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);

        thunkAPI.dispatch(setIsAccountInitial(true));
        thunkAPI.dispatch(setIsCategoryInitial(true));
        thunkAPI.dispatch(setIsTransactionInitial(true));

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.metaData.message || error.message);
    }
});

export const authRegister = createAsyncThunk('auth/authRegister', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${URL}`,
            data
        });

        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);

        thunkAPI.dispatch(authLogin({ email: data.email, password: data.password }));

        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.metaData.message || error.message);
    }
});
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { listAccounts } from '../account/accountReducers';
import { getFilterDataTransaction } from '../../utils/helper';
import { config } from '../../utils/config';


const { apiUrl } = config();
const URL = `${apiUrl}/api/transactions`;

export const filterTransactions = createAsyncThunk('transaction/filterTransactions', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${URL}/filter`,
            data: getFilterDataTransaction()
        })
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const createTransactions = createAsyncThunk('transaction/createTransactions', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${URL}`,
            data
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        thunkAPI.dispatch(filterTransactions());
        thunkAPI.dispatch(listAccounts());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const transferTransactions = createAsyncThunk('transaction/transferTransaction', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${apiUrl}/api/transfers`,
            data
        });

        if (!response.data.success) throw new Error(response.data.message || "Failed to transfer");
        
        thunkAPI.dispatch(filterTransactions());
        thunkAPI.dispatch(listAccounts());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
})

export const getSummaryCategory = createAsyncThunk('transaction/getSummaryCategory', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${URL}/summary/category`,
            params: data
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const getSummaryTrend = createAsyncThunk('transaction/getSummaryTrend', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${URL}/summary/trend`,
            params: data
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})
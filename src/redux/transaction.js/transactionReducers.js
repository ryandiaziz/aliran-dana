import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const URL = 'https://yonews-api.vercel.app/api/articles'
const URL = 'http://localhost:3000/api/transactions';

export const listTransactions = createAsyncThunk('transaction/listTransactions', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${URL}`
            // url: `${URL}?country=${data.country}&category=${data.category}`
        })
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
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
        thunkAPI.dispatch(listTransactions())
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})
import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setDialogOpen } from '../dialog/dialogSlice';

const URL = 'http://localhost:3000/api/accounts';

export const listAccounts = createAsyncThunk('account/listAccounts', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${URL}`
        })
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})


export const createAccount = createAsyncThunk('account/createAccount', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${URL}`,
            data
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        thunkAPI.dispatch(listAccounts());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const updateAccount = createAsyncThunk('account/updateAccount', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'PUT',
            url: `${URL}`,
            data
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        thunkAPI.dispatch(listAccounts());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const deleteAccount = createAsyncThunk('account/deleteAccount', async (data, thunkAPI) => {
    try {        
        const response = await axios({
            method: 'DELETE',
            url: `${URL}/${data}`
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        thunkAPI.dispatch(setDialogOpen());
        thunkAPI.dispatch(listAccounts());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})
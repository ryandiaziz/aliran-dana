import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setDialogOpen } from '../dialog/dialogSlice';

const URL = 'http://localhost:3000/api/categories';

export const listCategories = createAsyncThunk('category/listCategories', async (data, thunkAPI) => {
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

export const createCategory = createAsyncThunk('account/createCategory', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${URL}`,
            data
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        thunkAPI.dispatch(listCategories());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const updateCategory = createAsyncThunk('account/updateCategory', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'PUT',
            url: `${URL}`,
            data
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        thunkAPI.dispatch(listCategories());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const deleteCategory = createAsyncThunk('account/deleteCategory', async (data, thunkAPI) => {
    try {        
        const response = await axios({
            method: 'DELETE',
            url: `${URL}/${data}`
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        thunkAPI.dispatch(setDialogOpen());
        thunkAPI.dispatch(listCategories());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})
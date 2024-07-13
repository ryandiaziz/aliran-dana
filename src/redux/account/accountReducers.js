import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const URL = 'https://yonews-api.vercel.app/api/articles'
const URL = 'http://localhost:3000/api/accounts';

export const listAccounts = createAsyncThunk('account/listAccounts', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${URL}`
            // url: `${URL}?country=${data.country}&category=${data.category}`
        })
        // thunkAPI.dispatch(setpagination(response.data.articles))
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

// export const searchArticles = createAsyncThunk('article/searchArticles', async (data, thunkAPI) => {
//     try {
//         const response = await axios({
//             method: 'GET',
//             url: `${URL}/search?country=${data.country}&category=${data.category}&q=${data.q}`
//         })
//         thunkAPI.dispatch(setpagination(response.data.articles))
//         return response.data.articles
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.message)
//     }
// })